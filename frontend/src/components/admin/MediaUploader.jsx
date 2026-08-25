import { useRef, useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import api from "../../api/client";

export default function MediaUploader({ value, onChange, accept = "image/*,video/*" }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post("/admin/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange(res.data.url, res.data.resourceType);
    } catch {
      setError("Échec de l'envoi, réessayez.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      {value && (
        <div className="mb-3 rounded-none overflow-hidden border border-ink/10 max-w-xs">
          {value.match(/\.(mp4|mov|webm)(\?|$)/i) ? (
            <video src={value} className="w-full h-32 object-cover" muted />
          ) : (
            <img src={value} alt="" className="w-full h-32 object-cover" />
          )}
        </div>
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-2 rounded-none border border-ink/15 hover:border-accent px-4 py-2.5 text-sm disabled:opacity-60"
      >
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
        {uploading ? "Envoi en cours..." : value ? "Remplacer le média" : "Importer image / vidéo"}
      </button>
      <input ref={inputRef} type="file" accept={accept} onChange={handleFile} className="hidden" />
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}
