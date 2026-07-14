function CompareReport() {

  return (

    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

      <h2 className="mb-6 text-2xl font-bold dark:text-white">

        Compare Reports

      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-blue-50 p-5 dark:bg-blue-900/20">

          <p className="text-gray-500">
            This Month
          </p>

          <h2 className="mt-2 text-3xl font-bold">

            ₹0

          </h2>

        </div>

        <div className="rounded-2xl bg-green-50 p-5 dark:bg-green-900/20">

          <p className="text-gray-500">

            Last Month

          </p>

          <h2 className="mt-2 text-3xl font-bold">

            ₹0

          </h2>

        </div>

      </div>

    </div>

  );

}

export default CompareReport;