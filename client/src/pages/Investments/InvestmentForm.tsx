import { useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Investment, InvestmentFormData } from "../../types/investment";
import { useInvestments } from "../../hooks/useInvestments";

const investmentSchema = z.object({
  title: z.string().min(2, "Title is required"),

  symbol: z.string().optional(),

  type: z.enum([
    "Stock",
    "Mutual Fund",
    "SIP",
    "ETF",
    "Gold",
    "Crypto",
    "FD",
    "PPF",
    "NPS",
    "Real Estate",
    "Bond",
    "Other",
  ]),

  investedAmount: z.number(),

  currentValue: z.number(),

  quantity: z.number(),

  purchasePrice: z.number(),

  currentPrice: z.number(),

  purchaseDate: z.string(),

  platform: z.string(),

  currency: z.enum(["INR", "USD"]),

  status: z.enum(["Active", "Sold"]),

  riskLevel: z.enum(["Low", "Medium", "High"]),

  notes: z.string().optional(),

  tags: z.array(z.string()).optional(),
});

interface Props {
  open: boolean;

  investment: Investment | null;

  onClose: () => void;
}

function InvestmentForm({ open, investment, onClose }: Props) {
  const isEdit = !!investment;
  const { createInvestmentAsync, updateInvestmentAsync } = useInvestments();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InvestmentFormData>({
    resolver: zodResolver(investmentSchema),

    defaultValues: {
      title: "",

      symbol: "",

      type: "Stock",

      investedAmount: 0,

      currentValue: 0,

      quantity: 1,

      purchasePrice: 0,

      currentPrice: 0,

      purchaseDate: new Date().toISOString().split("T")[0],

      platform: "",

      currency: "INR",

      status: "Active",

      riskLevel: "Medium",

      notes: "",

      tags: [],
    },
  });

  useEffect(() => {
    if (!investment) {
      reset();

      return;
    }

    reset({
      ...investment,

      purchaseDate: investment.purchaseDate.split("T")[0],
    });
  }, [investment, reset]);

  const onSubmit = async (data: InvestmentFormData) => {
    try {
      if (isEdit && investment) {
        await updateInvestmentAsync({
          id: investment._id,
          data,
        });
      } else {
        await createInvestmentAsync(data);
      }

      reset();

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl dark:bg-gray-900">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold dark:text-white">
              {isEdit ? "Edit Investment" : "Add Investment"}
            </h2>

            <p className="mt-1 text-gray-500">
              Manage your investment portfolio.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-h-[70vh] overflow-y-auto overscroll-contain space-y-6 p-6">
            {/* Part 2 */}

            {/* Basic Information */}

            <div className="grid gap-6 md:grid-cols-2">
              {/* Title */}

              <div>
                <label className="mb-2 block text-sm font-semibold dark:text-white">
                  Investment Title
                </label>

                <input
                  {...register("title")}
                  placeholder="Apple Inc."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />

                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Symbol */}

              <div>
                <label className="mb-2 block text-sm font-semibold dark:text-white">
                  Symbol
                </label>

                <input
                  {...register("symbol")}
                  placeholder="AAPL"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 uppercase outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Investment Type */}

              <div>
                <label className="mb-2 block text-sm font-semibold dark:text-white">
                  Investment Type
                </label>

                <select
                  {...register("type")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option>Stock</option>
                  <option>Mutual Fund</option>
                  <option>SIP</option>
                  <option>ETF</option>
                  <option>Gold</option>
                  <option>Crypto</option>
                  <option>FD</option>
                  <option>PPF</option>
                  <option>NPS</option>
                  <option>Real Estate</option>
                  <option>Bond</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Platform */}

              <div>
                <label className="mb-2 block text-sm font-semibold dark:text-white">
                  Platform
                </label>

                <input
                  {...register("platform")}
                  placeholder="Groww"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Currency */}

              <div>
                <label className="mb-2 block text-sm font-semibold dark:text-white">
                  Currency
                </label>

                <select
                  {...register("currency")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>

              {/* Financial Information */}

              <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                <h3 className="mb-5 text-lg font-bold dark:text-white">
                  Financial Information
                </h3>

                <div className="grid gap-6 md:grid-cols-2"></div>
              </div>

              {/* ROI Preview */}

              {(() => {
                const invested = watch("investedAmount") || 0;

                const current = watch("currentValue") || 0;

                const profit = current - invested;

                const roi = invested === 0 ? 0 : (profit / invested) * 100;

                return (
                  <div className="rounded-2xl bg-linear-to-r from-blue-50 to-cyan-50 p-5 dark:from-slate-800 dark:to-slate-900">
                    <h3 className="mb-4 text-lg font-bold dark:text-white">
                      Live Portfolio Preview
                    </h3>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Profit</p>

                        <h3
                          className={`mt-1 text-xl font-bold ${
                            profit >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          ₹{profit.toLocaleString()}
                        </h3>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">ROI</p>

                        <h3
                          className={`mt-1 text-xl font-bold ${
                            roi >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {roi.toFixed(2)}%
                        </h3>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Status</p>

                        <h3
                          className={`mt-1 text-xl font-bold ${
                            roi >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {roi >= 0 ? "Profit" : "Loss"}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Additional Information */}

              <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                <h3 className="mb-5 text-lg font-bold dark:text-white">
                  Additional Information
                </h3>

                <div className="space-y-5">
                  {/* Notes */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold dark:text-white">
                      Notes
                    </label>

                    <textarea
                      {...register("notes")}
                      rows={4}
                      placeholder="Write any notes..."
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  {/* Tags */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold dark:text-white">
                      Tags
                    </label>

                    <input
                      placeholder="long-term, dividend, retirement"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      onBlur={(e) => {
                        const value = e.target.value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter(Boolean);

                        reset({
                          ...getValues(),
                          tags: value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Invested Amount */}

              <div>
                <label className="mb-2 block text-sm font-semibold dark:text-white">
                  Invested Amount
                </label>

                <input
                  type="number"
                  {...register("investedAmount", {
                    valueAsNumber: true,
                  })}
                  placeholder="100000"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Current Value */}

              <div>
                <label className="mb-2 block text-sm font-semibold dark:text-white">
                  Current Value
                </label>

                <input
                  type="number"
                  {...register("currentValue", {
                    valueAsNumber: true,
                  })}
                  placeholder="120000"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Quantity */}

              <div>
                <label className="mb-2 block text-sm font-semibold dark:text-white">
                  Quantity
                </label>

                <input
                  type="number"
                  {...register("quantity", {
                    valueAsNumber: true,
                  })}
                  placeholder="10"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Purchase Price */}

              <div>
                <label className="mb-2 block text-sm font-semibold dark:text-white">
                  Purchase Price
                </label>

                <input
                  type="number"
                  {...register("purchasePrice", {
                    valueAsNumber: true,
                  })}
                  placeholder="1000"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Current Price */}

              <div>
                <label className="mb-2 block text-sm font-semibold dark:text-white">
                  Current Price
                </label>

                <input
                  type="number"
                  {...register("currentPrice", {
                    valueAsNumber: true,
                  })}
                  placeholder="1200"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Purchase Date */}

              <div>
                <label className="mb-2 block text-sm font-semibold dark:text-white">
                  Purchase Date
                </label>

                <input
                  type="date"
                  {...register("purchaseDate")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Status */}

              <div>
                <label className="mb-2 block text-sm font-semibold dark:text-white">
                  Status
                </label>

                <select
                  {...register("status")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              {/* Risk */}

              <div>
                <label className="mb-2 block text-sm font-semibold dark:text-white">
                  Risk Level
                </label>

                <select
                  {...register("riskLevel")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 flex justify-end gap-4 border-t border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-6 py-3 font-semibold transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : isEdit
                  ? "Update Investment"
                  : "Create Investment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvestmentForm;
