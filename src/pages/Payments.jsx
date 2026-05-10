import { useEffect, useState } from 'react'
import { getPaymentsData, payNow } from '../data/api.js'
import PageHeader from '../components/ui/PageHeader'
import SectionCard from '../components/ui/SectionCard'
import StatCard from '../components/ui/StatCard'
import StatusBadge from '../components/ui/StatusBadge'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../components/ui/useToast.jsx'

function formatEGP(value) {
  return `${value} EGP`
}

function downloadCSV(payments) {
  const rows = [
    ['Date', 'Amount', 'Receipt', 'Status'],
    ...payments.map((payment) => [
      payment.date,
      payment.amount,
      payment.receipt,
      payment.status,
    ]),
  ]

  const csv = rows.map((row) => row.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.setAttribute('download', 'payment-history.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function Payments() {
  const { showToast } = useToast()
  const [summary, setSummary] = useState(null)
  const [payments, setPayments] = useState([])
  const [query, setQuery] = useState('')
  const [loadingPay, setLoadingPay] = useState(false)

  async function loadData(search = '') {
    const data = await getPaymentsData(search)
    setSummary(data.summary)
    setPayments(data.payments)
  }

  useEffect(() => {
    loadData(query)
  }, [query])

  const handlePayNow = async () => {
    setLoadingPay(true)

    try {
      const result = await payNow()
      setSummary(result.summary)
      setPayments(result.payments)
      showToast(`Payment completed. Receipt #${result.receipt}`)
    } catch (error) {
      showToast(error.message, 'error')
    } finally {
      setLoadingPay(false)
    }
  }

  if (!summary) return <p className="text-slate-500">Loading payments...</p>

  return (
    <div className="space-y-8">
      <PageHeader
        title="Payments"
        subtitle="Track your fees, receipts, and payment status."
        actions={
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <input
              type="text"
              placeholder="Search payments..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 md:w-64"
            />
            <button
              onClick={() => downloadCSV(payments)}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Export CSV
            </button>
          </div>
        }
      />

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Outstanding" value={formatEGP(summary.outstanding)} color="text-red-600" />
        <StatCard title="Paid" value={formatEGP(summary.paid)} color="text-emerald-600" />
        <StatCard title="Status" value={summary.status} color="text-sky-600" />
        <StatCard title="Last Payment" value={summary.lastPaymentDate} />
      </section>

      <SectionCard
        title="Payment History"
        actions={
          <button
            onClick={handlePayNow}
            disabled={loadingPay}
            className="rounded-2xl bg-violet-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:opacity-50"
          >
            {loadingPay ? 'Processing...' : 'Pay Now'}
          </button>
        }
      >
        {payments.length === 0 ? (
          <EmptyState
            title="No payments found"
            description="Payment records will appear here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Receipt</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-slate-100 text-sm">
                    <td className="py-4">{payment.date}</td>
                    <td className="py-4">{formatEGP(payment.amount)}</td>
                    <td className="py-4">{payment.receipt}</td>
                    <td className="py-4">
                      <StatusBadge value={payment.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </div>
  )
}

export default Payments