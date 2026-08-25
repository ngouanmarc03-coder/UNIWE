import { motion, AnimatePresence } from "framer-motion";
import { Globe, MessageCircle, X } from "lucide-react";

export default function ChannelChoiceDialog({ open, onClose, onChooseSite, onChooseWhatsapp, sending }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-ink/70 backdrop-blur-sm flex items-center justify-center px-5"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-sand rounded-none p-8 md:p-10 max-w-md w-full relative"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-ink/40 hover:text-ink"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <h3 className="font-display text-2xl mb-2">Comment envoyer votre demande ?</h3>
            <p className="text-sm text-ink/60 mb-8">
              Choisissez le canal par lequel vous souhaitez transmettre votre demande de devis.
            </p>

            <div className="space-y-4">
              <button
                disabled={sending}
                onClick={onChooseSite}
                className="w-full flex items-center gap-4 rounded-none border border-ink/10 hover:border-accent px-5 py-4 text-left transition-colors disabled:opacity-60"
              >
                <Globe className="text-accent" size={22} />
                <div>
                  <p className="font-medium text-sm">Via le site</p>
                  <p className="text-xs text-ink/50">Votre demande arrive directement à notre équipe</p>
                </div>
              </button>

              <button
                disabled={sending}
                onClick={onChooseWhatsapp}
                className="w-full flex items-center gap-4 rounded-none border border-ink/10 hover:border-accent px-5 py-4 text-left transition-colors disabled:opacity-60"
              >
                <MessageCircle className="text-accent" size={22} />
                <div>
                  <p className="font-medium text-sm">Via WhatsApp</p>
                  <p className="text-xs text-ink/50">Ouvre WhatsApp avec votre demande pré-remplie</p>
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
