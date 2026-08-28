import { AnimatePresence, motion } from "framer-motion";
import { Users, Bell, HandHeart, X } from "lucide-react";
import WhatsAppIcon from "../icons/WhatsAppIcon.jsx";

const POINTS = [
  { icon: Bell, label: "Actualités" },
  { icon: Users, label: "Échanges directs" },
  { icon: HandHeart, label: "Conseils pratiques" },
];

export default function CommunityModal({ open, onClose, whatsappCommunityLink }) {
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
            className="bg-sand rounded-none p-7 md:p-9 max-w-md w-full relative"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-ink/40 hover:text-ink"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <p className="uppercase tracking-[0.25em] text-accent text-xs mb-3">Communauté</p>
            <h3 className="font-display text-xl md:text-2xl mb-3 pr-6">
              Rejoignez la communauté WhatsApp UNIWÊ
            </h3>
            <p className="text-sm text-ink/60 mb-6 leading-relaxed">
              Actualités, conseils et échanges directs avec l'équipe et les autres clients.
            </p>

            {whatsappCommunityLink ? (
              <a
                href={whatsappCommunityLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-full bg-ink text-sand hover:bg-accent hover:scale-[1.03] active:scale-[0.97] transition-all px-6 py-4 text-sm font-medium"
              >
                <WhatsAppIcon size={17} /> Rejoindre le groupe WhatsApp
              </a>
            ) : (
              <p className="text-sm text-ink/40 text-center border border-ink/10 rounded-none py-4">
                Le lien de la communauté sera bientôt disponible.
              </p>
            )}

            <div className="flex items-center justify-center gap-5 mt-6">
              {POINTS.map((p) => (
                <div key={p.label} className="flex items-center gap-1.5 text-xs text-ink/50">
                  <p.icon size={14} className="text-accent" />
                  {p.label}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
