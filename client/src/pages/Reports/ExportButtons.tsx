import {
  Download,
  FileSpreadsheet,
  Printer,
} from "lucide-react";

import {
  exportCSV,
  exportPDF,
} from "../../services/export.service";

function ExportButtons() {
  return (
    <div className="flex flex-wrap gap-3">

      <button
        onClick={exportPDF}
        className="
          flex
          items-center
          gap-2
          rounded-2xl
          bg-gradient-to-r
          from-red-600
          to-rose-600
          px-6
          py-3
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <Download size={18} />

        Export PDF
      </button>

      <button
        onClick={exportCSV}
        className="
          flex
          items-center
          gap-2
          rounded-2xl
          bg-gradient-to-r
          from-green-600
          to-emerald-600
          px-6
          py-3
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <FileSpreadsheet size={18} />

        Export Excel
      </button>

      <button
        onClick={() => window.print()}
        className="
          flex
          items-center
          gap-2
          rounded-2xl
          bg-gradient-to-r
          from-slate-700
          to-slate-900
          px-6
          py-3
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <Printer size={18} />

        Print
      </button>

    </div>
  );
}

export default ExportButtons;