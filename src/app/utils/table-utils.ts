export const exportToCSV = (
  exportTable: string,
  excludedColumnsIndexWhileExportingTable: any[]
): void => {
  const table = document.getElementById(exportTable) as HTMLTableElement;
  const csvData = tableToCSVReport(
    table,
    excludedColumnsIndexWhileExportingTable
  );
  downloadCSVFile(csvData);
};

const tableToCSVReport = (
  table: HTMLTableElement,
  excludedColumns: number[] = []
): string => {
  let csv_data = [];
  let rows = table.getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let cols = row.querySelectorAll('td, th');
    let csvRow = [];
    for (let j = 0; j < cols.length; j++) {
      if (!excludedColumns.includes(j)) {
        let cell = cols[j];
        // Clone the cell to modify it without affecting the original table
        let clonedCell = cell.cloneNode(true) as HTMLElement;
        // Remove any select elements from the cloned cell
        let selects = clonedCell.querySelectorAll('select');
        selects.forEach((select) => select.remove());
        let cellValue = clonedCell.textContent
          ? clonedCell.textContent.trim()
          : '';
        // Add double quotes around cell value and escape any existing double quotes
        csvRow.push('"' + cellValue.replace(/"/g, '""') + '"');
      }
    }
    csv_data.push(csvRow.join(','));
  }
  return csv_data.join('\n');
};

const downloadCSVFile = (csvData: string) => {
  let CSVFile = new Blob([csvData], {
    type: 'text/csv',
  });

  let temp_link = document.createElement('a');
  temp_link.download = 'TableData.csv';
  let url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  temp_link.style.display = 'none';
  document.body.appendChild(temp_link);

  temp_link.click();
  document.body.removeChild(temp_link);
};

export const printTable = (
  table: HTMLTableElement,
  tableHeader: string,
  excludedColumnIndices: number[] = []
) => {
  // Clone the table so you don't modify the original table
  let clonedTable = table.cloneNode(true) as HTMLTableElement;

  // Remove the specified columns from the cloned table
  if (excludedColumnIndices.length > 0) {
    let rows = clonedTable.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
      for (let j = excludedColumnIndices.length - 1; j >= 0; j--) {
        let cols = rows[i].querySelectorAll('td, th');
        if (cols.length > excludedColumnIndices[j]) {
          cols[excludedColumnIndices[j]].remove();
        }
      }
    }
  }

  // Remove all select elements from the cloned table
  let selects = clonedTable.getElementsByTagName('select') as any;
  while (selects.length > 0) {
    selects[0].parentNode.removeChild(selects[0]);
  }

  let newWin = window.open('') as any;
  newWin.document.write(clonedTable.outerHTML);
  newWin.document.write('<style type="text/css">');
  newWin.document.write(tablePrintCss());
  newWin.document.write('</style>');
  newWin.document.title = tableHeader;
  newWin.print();
  newWin.close();
};

export const tablePrintCss = () => {
  return `body
      {
          font-family: Arial;
          font-size: 10pt;
      }
      table
      {
          border: 1px solid #ccc;
          border-collapse: collapse;
          color: black;
      }
      table th
      {
          font-weight: bold;
          padding: 10px 15px;
          text-align: center;
          background-color: rgb(9, 79, 104);
          color: black;
      }
      table th, table td
      {
          border: 1px solid #16a7e0;
          padding: 10px 15px;
      }`;
};

export const copyTable = (
  elToBeCopied: any,
  excludedColumnsIndexWhileExportingTable: any[]
) => {
  let range, sel;

  // Ensure that range and selection are supported by the browsers
  if (document.createRange && window.getSelection) {
    range = document.createRange();
    sel = window.getSelection() as any;
    // unselect any element in the page
    sel.removeAllRanges();
    const selects = elToBeCopied.querySelectorAll('select');
    selects.forEach((select: any) => select.remove());

    const rows = elToBeCopied.rows;
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].cells;
      for (
        let j = excludedColumnsIndexWhileExportingTable.length - 1;
        j >= 0;
        j--
      ) {
        if (excludedColumnsIndexWhileExportingTable[j] < cells.length) {
          rows[i].deleteCell(excludedColumnsIndexWhileExportingTable[j]);
        }
      }
    }

    try {
      range.selectNodeContents(elToBeCopied);
      sel.addRange(range);
    } catch (e) {
      range.selectNode(elToBeCopied);
      sel.addRange(range);
    }

    document.execCommand('copy');
  }

  sel.removeAllRanges();
};
