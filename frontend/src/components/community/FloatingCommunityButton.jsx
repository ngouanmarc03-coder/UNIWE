import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import api from "../../api/client";
import CommunityModal from "./CommunityModal.jsx";

export default function FloatingCommunityButton() {
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);
  const draggedRef = useRef(false);
  const constraintsRef = useRef(null);

  useEffect(() => {
    api
      .get("/settings")
      .then((r) => setLink(r.data.whatsappCommunityLink || ""))
      .catch(() => {});
  }, []);

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-0 z-40 pointer-events-none" />
      <motion.button
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        dragElastic={0.06}
        onDragStart={() => {
          draggedRef.current = true;
        }}
        onClick={() => {
          if (draggedRef.current) {
            draggedRef.current = false;
            return;
          }
          setOpen(true);
        }}
        whileTap={{ scale: 0.96 }}
        title="Glissez pour déplacer, cliquez pour ouvrir"
        aria-label="Rejoindre la communauté"
        className="fixed bottom-6 right-6 z-40 pointer-events-auto flex items-center gap-2.5 rounded-full bg-sand text-ink pl-4 pr-5 py-3 shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.24)] hover:scale-[1.03] active:scale-[0.97] transition-all cursor-grab active:cursor-grabbing select-none"
      >
        <MessageCircle size={19} className="text-accent" />
        <span className="text-sm font-medium whitespace-nowrap">Besoin d'aide ?</span>
      </motion.button>

      <CommunityModal open={open} onClose={() => setOpen(false)} whatsappCommunityLink={link} />
    </>
  );
}
