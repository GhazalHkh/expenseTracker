import { useState } from 'react'
import './App.css'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

function App() {
  const [transactions, setTransactions] = useState([])
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')

  const initialBalance = 100

  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const totalExpense = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const balance = initialBalance + totalIncome - totalExpense

  const equity = balance

  const pieData = [
    {
      name: 'Income',
      value: totalIncome
    },
    {
      name: 'Expense',
      value: totalExpense
    }
  ].filter((item) => item.value > 0)

  const COLORS = ['#8b5cf6', '#f43f5e']

  function addTransaction() {
    const numericAmount = Number(amount)

    if (!name.trim() || numericAmount <= 0) return

    const newTransaction = {
      id: Date.now(),
      name: name.trim(),
      amount: numericAmount,
      type
    }

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction
    ])

    setName('')
    setAmount('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    addTransaction()
  }

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div className="brand">

          <div className="brand-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 7H5a1 1 0 0 1 0-2h13V3H5C3.35 3 2 4.35 2 6v12c0 1.65 1.35 3 3 3h15c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2m0 10h-5a2 2 0 1 1 0-4h5zm0-6h-5a4 4 0 1 0 0 8h5v1H5c-.55 0-1-.45-1-1V8.82c.31.11.65.18 1 .18h15z" />
            </svg>
          </div>

          <div>
            <h1>Expense Tracker</h1>
            <p>Manage your money with clarity.</p>
          </div>

        </div>

        <div className="header-badge">
          <span className="status-dot"></span>
          Financial Overview
        </div>

      </header>


      {/* SUMMARY CARDS */}
      <section className="summary-grid">

        {/* BALANCE */}
        <div className="summary-card balance-card">

          <div className="card-top">

            <div className="summary-icon balance-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 7V5c0-1.1-.9-2-2-2H5C3.35 3 2 4.35 2 6v12c0 1.65 1.35 3 3 3h15c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM5 5h13v2H5c-.55 0-1-.45-1-1s.45-1 1-1m15 14H5c-.55 0-1-.45-1-1V8.82c.31.11.65.18 1 .18h15z" />
              </svg>
            </div>

            <span className="card-label">
              Total Balance
            </span>

          </div>

          <div className="card-value">
            ${balance.toFixed(2)}
          </div>

          <div className="card-footer">
            <span className="footer-dot purple"></span>
            Available balance
          </div>

        </div>


        {/* INCOME */}
        <div className="summary-card income-card">

          <div className="card-top">

            <div className="summary-icon income-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2 4 10h5v12h6V10h5z" />
              </svg>
            </div>

            <span className="card-label">
              Income
            </span>

          </div>

          <div className="card-value">
            ${totalIncome.toFixed(2)}
          </div>

          <div className="card-footer">
            <span className="footer-dot green"></span>
            Total received
          </div>

        </div>


        {/* EQUITY */}
        <div className="summary-card equity-card">

          <div className="card-top">

            <div className="summary-icon equity-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 19h16v2H4zm2-2h2V9H6zm5 0h2V5h-2zm5 0h2v-8h-2z" />
              </svg>
            </div>

            <span className="card-label">
              Equity
            </span>

          </div>

          <div className="card-value">
            ${equity.toFixed(2)}
          </div>

          <div className="card-footer">
            <span className="footer-dot pink"></span>
            Current financial value
          </div>

        </div>

      </section>


      {/* ANALYTICS */}
      <section className="analytics-grid">

        {/* CHART */}
        <div className="chart-card">

          <div className="section-heading">

            <div>
              <h2>Financial Overview</h2>
              <p>Income vs. expenses</p>
            </div>

            <div className="chart-total">
              ${(totalIncome + totalExpense).toFixed(2)}
            </div>

          </div>


          {pieData.length > 0 ? (

            <div className="chart-wrapper">

              <ResponsiveContainer width="100%" height={260}>

                <PieChart>

                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >

                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}

                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      `$${Number(value).toFixed(2)}`
                    }
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #f0e7f4',
                      boxShadow:
                        '0 8px 30px rgba(50, 20, 80, 0.08)'
                    }}
                  />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          ) : (

            <div className="empty-chart">

              <div className="empty-chart-icon">
                +
              </div>

              <p>
                No financial data yet
              </p>

              <span>
                Add your first transaction to see the chart.
              </span>

            </div>

          )}

        </div>


        {/* QUICK STATS */}
        <div className="stats-card">

          <div className="section-heading">

            <div>
              <h2>Quick Stats</h2>
              <p>Your financial activity</p>
            </div>

          </div>


          <div className="stat-row">

            <div>
              <span className="stat-title">
                Transactions
              </span>

              <span className="stat-description">
                Total recorded
              </span>
            </div>

            <strong>
              {transactions.length}
            </strong>

          </div>


          <div className="stat-row">

            <div>
              <span className="stat-title">
                Expenses
              </span>

              <span className="stat-description">
                Money spent
              </span>
            </div>

            <strong className="expense-text">
              ${totalExpense.toFixed(2)}
            </strong>

          </div>


          <div className="stat-row">

            <div>
              <span className="stat-title">
                Income
              </span>

              <span className="stat-description">
                Money received
              </span>
            </div>

            <strong className="income-text">
              ${totalIncome.toFixed(2)}
            </strong>

          </div>


          <div className="stat-row">

            <div>
              <span className="stat-title">
                Net Change
              </span>

              <span className="stat-description">
                Income minus expenses
              </span>
            </div>

            <strong
              className={
                totalIncome - totalExpense >= 0
                  ? 'income-text'
                  : 'expense-text'
              }
            >
              {totalIncome - totalExpense >= 0
                ? '+'
                : '-'}
              $
              {Math.abs(
                totalIncome - totalExpense
              ).toFixed(2)}
            </strong>

          </div>

        </div>

      </section>


      {/* ADD TRANSACTION */}
      <section className="transaction-form-card">

        <div className="form-heading">

          <div className="form-icon">
            +
          </div>

          <div>
            <h2>Add Transaction</h2>
            <p>
              Keep your financial records up to date.
            </p>
          </div>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            {/* NAME */}
            <div className="input-group">

              <label>
                Transaction Name
              </label>

              <input
                type="text"
                placeholder="e.g. Groceries"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />

            </div>


            {/* AMOUNT */}
            <div className="input-group">

              <label>
                Amount
              </label>

              <div className="amount-input">

                <span>$</span>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(event) =>
                    setAmount(event.target.value)
                  }
                />

              </div>

            </div>


            {/* TYPE */}
            <div className="input-group">

              <label>
                Type
              </label>

              <select
                value={type}
                onChange={(event) =>
                  setType(event.target.value)
                }
              >

                <option value="expense">
                  Expense
                </option>

                <option value="income">
                  Income
                </option>

              </select>

            </div>

          </div>


          <button
            className="add-button"
            type="submit"
          >

            <span>
              +
            </span>

            Add {type === 'expense'
              ? 'Expense'
              : 'Income'}

          </button>

        </form>

      </section>


      {/* RECENT TRANSACTIONS */}
      <section className="transactions-card">

        <div className="section-heading transactions-heading">

          <div>
            <h2>
              Recent Transactions
            </h2>

            <p>
              Your latest financial activity
            </p>
          </div>

          <span className="transaction-count">
            {transactions.length} total
          </span>

        </div>


        {transactions.length === 0 ? (

          <div className="empty-transactions">

            <div className="empty-icon">
              $
            </div>

            <h3>
              No transactions yet
            </h3>

            <p>
              Add your first income or expense above.
            </p>

          </div>

        ) : (

          <div className="table-wrapper">

            <table className="transactions">

              <thead>

                <tr>
                  <th>TYPE</th>
                  <th>TRANSACTION</th>
                  <th>AMOUNT</th>
                </tr>

              </thead>


              <tbody>

                {[...transactions]
                  .reverse()
                  .map((transaction) => (

                    <tr key={transaction.id}>

                      <td>

                        <div
                          className={
                            transaction.type === 'income'
                              ? 'transaction-icon income-bg'
                              : 'transaction-icon expense-bg'
                          }
                        >
                          {transaction.type === 'income'
                            ? '↑'
                            : '↓'}
                        </div>

                      </td>


                      <td>

                        <div className="transaction-name">
                          {transaction.name}
                        </div>

                        <div className="transaction-type">
                          {transaction.type === 'income'
                            ? 'Income'
                            : 'Expense'}
                        </div>

                      </td>


                      <td>

                        <span
                          className={
                            transaction.type === 'income'
                              ? 'income-amount'
                              : 'expense-amount'
                          }
                        >
                          {transaction.type === 'income'
                            ? '+'
                            : '-'}
                          ${transaction.amount.toFixed(2)}
                        </span>

                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        )}

      </section>


      {/* FOOTER */}
      <footer>

        <span>
          Expense Tracker
        </span>

        <span>
          Personal Finance Dashboard
        </span>

      </footer>

    </div>
  )
}

export default App

