import pandas as pd
import os

file_path = 'northstar/BANCO DE DADOS NORTH STAR.xlsx'
summary_path = 'excel_summary.txt'

if not os.path.exists(file_path):
    print(f"File not found: {file_path}")
    exit(1)

xls = pd.ExcelFile(file_path)
with open(summary_path, 'w', encoding='utf-8') as f:
    f.write(f"Sheets found: {xls.sheet_names}\n")
    for sheet in xls.sheet_names:
        f.write(f"\n{'='*20} {sheet} {'='*20}\n")
        # Read header=None to see everything
        df = pd.read_excel(file_path, sheet_name=sheet, header=None)
        f.write(f"Shape: {df.shape}\n")
        f.write(df.head(20).to_string())
        f.write("\n\n")

print(f"Summary saved to {summary_path}")
