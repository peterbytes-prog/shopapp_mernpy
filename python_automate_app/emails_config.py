from smtplib import SMTP, SMTP_SSL
import email, os, secrets
from pathlib import Path


message = email.message.EmailMessage()
import getpass, imaplib
sender = "me@example.com"
recipient = "you@example.com"
message['From'] = sender
message['To'] = recipient
message['Subject'] = 'Greetings from {} to {}!'.format(sender, recipient)
body = """Hey there!
...
... I'm learning to send emails using Python!"""
message.set_content(body)

from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, Image
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from reportlab.graphics.shapes import Drawing
from reportlab.graphics.charts.piecharts import Pie




report = SimpleDocTemplate("./report.pdf")
report_chart = Drawing()
report_pie = Pie(width='3*inch', height='3*inch')
styles = getSampleStyleSheet()




# fruit = {
#   "elderberries": 1,
#   "figs": 1,
#   "apples": 2,
#   "durians": 3,
#   "bananas": 5,
#   "cherries": 8,
#   "grapes": 13
# }
# table_data = list(fruit.items())
# table_style = [('GRID', (0,0), (-1,-1), 1, colors.black)]
#
# report_pie.labels = [i for i in fruit]
# report_pie.data = [fruit[i] for i in report_pie.labels]
# report_chart.add(report_pie)
#
#
# report_title = Paragraph("A Complete Inventory of my Shop", styles['h1'])
#
# report_table = Table(data=table_data, style=table_style, hAlign="LEFT")
#
# report.build([report_title, report_table, report_chart])

# try:
#     server_ssl = smtplib.SMTP_SSL('smtp.gmail.com', 465)
#     server_ssl.ehlo()
#     server_ssl.login('ross.gallan.jr@gmail.com', mail_pass)
# except:
#     pass

#
