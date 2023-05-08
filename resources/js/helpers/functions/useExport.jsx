import { exportToCsv } from "@/helpers/functions/convertToCSV";

const useExport = (header, data, values) => {
  const csv = [
    header,
    ...data.map(values)
  ]

  exportToCsv('download.csv', csv)
}


export default useExport
