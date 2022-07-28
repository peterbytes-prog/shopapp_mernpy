from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, Spacer
from reportlab import lib
from reportlab.graphics.shapes import Drawing
from reportlab.graphics.charts.piecharts import Pie
from datetime import datetime
import os
from pathlib import Path
from logger import getLogger


logger = getLogger()
secion_headers = lambda txt: Paragraph(f"""<font size=12><b><u>{txt}</u></b></font>""")

secion_subheaders = lambda txt: Paragraph(f"""<para leftIndent=5><font size=10><b><u><i>{txt}</i></u></b></font></para>""")

def reportChart(data_lst, label_lst):
    """ create a Pie chart """
    cnv = Drawing(200, 100) #create canvas
    chart = Pie() #create pie chart and set radius
    chart.x = 75
    chart.data = data_lst
    chart.labels = label_lst
    cnv.add(chart)
    return cnv

def reportTable(data):
    'create table with total section at the bottom'
    header_row = [Paragraph('<b>Products</b>'), Paragraph('<b>Department</b>'), Paragraph('<b>Quantity</b>')] #three column table
    body_rows = list(zip(data['products'], data['department'],data['quantity'])) #create a 3d list from produt name, department and quantity
    total_row = [Paragraph("<b>Total</b>"), " ", Paragraph(f"<b>{sum(list(map(int,data['quantity'])))}</b>")] #total row only for column quantity
    table_style = [
        ('GRID', (0,0), (-1,-1), 1, lib.colors.black),
        ('BACKGROUND', (0,0), (-1,0),lib.colors.lavender),
        ('BACKGROUND', (0,-1), (-1,-1), lib.colors.grey)
    ]
    return Table(data=[header_row, *body_rows, total_row], style=table_style, hAlign="LEFT")

    pass
def generateReport(data, recv):
    format_dtime_to_path = lambda t: Path(t.strftime("%Y/%m/%d/%H/%M/%S")) #convert datetime to path like string
    try: #if date supplied in data
        inv_date = recv.get('Date')
        inv_date = (inv_date[0:inv_date.index('+')]).strip()
        inv_date = datetime.strptime(inv_date, "%a, %d %b %Y %H:%M:%S")
        fl_path = Path(f"./reports/inventories")/format_dtime_to_path(inv_date)
    except Exception as exc: #use current date time
        logger.warning(f'time to path exception {exc}')
        inv_date = datetime.now()
        fl_path = Path(f"./reports/inventories")/format_dtime_to_path(inv_date)
    if not fl_path.exists():
        os. makedirs(fl_path)
    fl_name = Path("".join([c if c.isalnum() else "_" for c in recv.get('From',"unknown")])+'.pdf') #file name


    styles = lib.styles.getSampleStyleSheet() #pdf styling object
    space = Spacer(width=1, height=10)
    title = Paragraph("New Inventory Report", styles["h1"])
    # help(Paragraph)
    subtitle_table = {
        "Date: ":recv.get('Date',""),
        "From: ":recv.get('From',""),
    }
    subtitle_table = Table(list(subtitle_table.items()), hAlign='LEFT')
    product_section_header = secion_headers("Products")
    promo_section_header = secion_headers("Promotions")
    summary_section_header = secion_headers("Summary")
    product_departments = [resp['product']['product']["department"] for resp in data] #all items department
    product_table = reportTable(data={
        "products":[resp['product']['product']["name"] for resp in data],
        "department":product_departments,
        "quantity":[resp['product']["quantity"] for resp in data]
    })#extract data for table

    promotion_departments = [resp['deal']['deal']['product']["department"] for resp in data if resp.get('deal')] #all promotion items department
    deal_table = reportTable(data={
        "products":[resp['deal']['deal']['product']["name"] for resp in data if resp.get('deal')],
        "department":promotion_departments,
        "quantity":[resp['deal']["quantity"] for resp in data if resp.get('deal')]
    }) #extract data for promotion table

    #summary headers
    product_department_counts = secion_subheaders("Product Department Counts")
    deal_department_counts = secion_subheaders("Promotion Department Counts")

    #summary charts
    product_department_count_dict = sorted(list(({i:product_departments.count(i) for i in product_departments}).items()))
    deal_department_count_dict = sorted(list(({i:promotion_departments.count(i) for i in promotion_departments}).items()))
    product_department_counts_pie = reportChart(data_lst=[i[1] for i in product_department_count_dict], label_lst=[i[0] for i in product_department_count_dict])
    deal_department_counts_pie = reportChart(data_lst=[i[1] for i in deal_department_count_dict], label_lst=[i[0] for i in deal_department_count_dict])
    save_path = str(fl_path/fl_name) #need string object to save
    doc = SimpleDocTemplate(save_path)
    doc.build([
        title,
        space,
        space,
        space,
        subtitle_table,
        space,
        product_section_header,
        space,
        product_table,
        space,
        promo_section_header,
        space,
        deal_table,
        space,
        summary_section_header,
        space,
        product_department_counts,
        space,
        product_department_counts_pie,
        space,
        deal_department_counts,
        space,
        deal_department_counts_pie
        ])
    return save_path
