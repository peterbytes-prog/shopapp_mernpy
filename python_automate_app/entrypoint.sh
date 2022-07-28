#!/usr/bin/env sh

export PATH="$PATH:/usr/local/bin/python3"
cd /app
cd python_app
python3 ./process_supplier_data.py #>> /proc/1/fd/1 2>/proc/1/fd/2 #output to stdout
