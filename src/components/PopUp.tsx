import logo from "../assets/logo.png";
import { Button } from "./Button";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

interface PopUpProps {
    header?: string;
    content?: string;
    result?: boolean;
    onClose: () => void;
    onConfirm?: () => void;
}

export const ConfirmPopUp = ({
    header = "",
    content = "",
    onClose,
    onConfirm,
}: PopUpProps) => {
    return (
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg text-center">
                <img src={logo} alt="Logo" className="mx-auto mb-4 h-12" />

                <p className="mt-2">{header}</p>
                <p className="text-lg font-semibold mb-4">{content}</p>

                <div className="flex flex-col gap-2">
                    <Button onClick={onConfirm} variant="transparent">Ya, lanjutkan bayar</Button>
                    <Button onClick={onClose} variant="grayTransparent" className="text-gray-400">
                        Batalkan
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const PopUp = ({
    header = "",
    content = "",
    result = false,
    onClose,
}: PopUpProps) => {
    return (
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg text-center">
                <div className="mb-4 flex justify-center">
                    {result ? (
                        <CheckCircleOutlined className="text-5xl text-green-500" />
                    ) : (
                        <CloseCircleOutlined className="text-5xl text-red-500" />
                    )}
                </div>

                <p className="mt-2">{header}</p>
                <p className="text-lg font-semibold">{content}</p>
                <p className="mb-4">{result ? "berhasil!" : "gagal"}</p>

                <div className="flex flex-col gap-2">
                    <Button onClick={onClose} variant="transparent">Kembali ke Beranda</Button>
                </div>
            </div>
        </div>
    );
};