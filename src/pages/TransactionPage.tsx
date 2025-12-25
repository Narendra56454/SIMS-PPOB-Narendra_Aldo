import { Header } from "../components/Header"
import { WelcomeAndBalance } from "../components/WelcomeAndBalance"

export const TransactionPage = () => {
    const Amount = ({ value }: { value: string }) => {
        const isPositive = value.trim().startsWith("+")

        return (
            <p className={isPositive ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                {value}
            </p>
        )
    }

    return (
        <main>
            <Header />

            <section>
                <WelcomeAndBalance />
            </section>

            <section className="my-10">
                <h1>Semua transaksi</h1>

                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex justify-between items-center px-4 py-2 border border-gray-200 rounded-lg">
                        <div className="space-y-1">
                            <Amount value="+ Rp.10.000" />
                            <p className="text-xs text-gray-500">17 Agustus 2023 13.10 WIB</p>
                        </div>
                        <div>
                            <p className="text-sm">Top Up Saldo</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2 border border-gray-200 rounded-lg">
                        <div className="space-y-1">
                            <Amount value="- Rp.10.000" />
                            <p className="text-xs text-gray-500">17 Agustus 2023 13.10 WIB</p>
                        </div>
                        <div>
                            <p className="text-sm">Top Up Saldo</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}