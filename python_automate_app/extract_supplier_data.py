import zipfile, pathlib

def extract(filepath):
    filepath = pathlib.Path(filepath)
    contents = []
    if filepath.exists():
        if zipfile.is_zipfile(filepath):
            with zipfile.ZipFile(filepath, 'r') as zf:
                for cnt in zf.namelist():
                    p = filepath.parent/pathlib.Path(cnt)
                    zf.extract(cnt, path=filepath.parent)
                    contents.append(p)

        else:
            raise ValueError("not zipfile")
    else:
        raise ValueError('invalid zip file path')
    return contents


if __name__ == '__main__':
    # fl = pathlib.Path(input('zip path'))
    fl = './Inventory/temp_ttmfjhv5FuU.x-zip-compressed'

    print(extract(fl))
