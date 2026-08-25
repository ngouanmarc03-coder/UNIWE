import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import Admin from "./models/Admin.js";
import Settings from "./models/Settings.js";
import HeroSlide from "./models/HeroSlide.js";
import Location from "./models/Location.js";
import Post from "./models/Post.js";
import Faq from "./models/Faq.js";

const mentionsLegales = `UNIWÊ est une entreprise spécialisée dans l'import-export de marchandises entre l'Afrique et l'Europe, actuellement active entre la Côte d'Ivoire et la France.

Directeur de la publication : Marc Ngouan.
Hébergement du site : hébergeur à préciser par l'administrateur.
Le présent site a pour vocation de présenter les activités de UNIWÊ et de permettre aux clients de demander un devis. Toute reproduction totale ou partielle du contenu de ce site est interdite sans autorisation préalable.`;

const cgu = `L'utilisation du site UNIWÊ implique l'acceptation pleine et entière des présentes conditions générales d'utilisation.

Le site permet notamment de consulter des informations sur les services d'import-export de UNIWÊ, de demander un devis (via le site ou via WhatsApp) et de rejoindre la communauté WhatsApp de l'entreprise. Les informations transmises via les formulaires sont utilisées exclusivement pour traiter les demandes des clients.

UNIWÊ se réserve le droit de modifier les présentes conditions à tout moment. Les avis publiés par les clients sont soumis à validation avant publication afin de garantir leur authenticité.`;

const confidentialite = `UNIWÊ accorde une grande importance à la protection des données personnelles de ses clients et visiteurs.

Les données collectées via le formulaire de devis (nom, téléphone, email, informations sur la marchandise) sont utilisées uniquement pour répondre à votre demande et ne sont jamais revendues à des tiers.

Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ce droit, contactez UNIWÊ via les coordonnées indiquées sur le site.`;

async function seed() {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || "admin@uniwe.com").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || "changeme123";
  const name = process.env.ADMIN_NAME || "Admin";

  let admin = await Admin.findOne({ email });
  if (!admin) {
    const passwordHash = await bcrypt.hash(password, 10);
    admin = await Admin.create({ email, passwordHash, name });
    console.log(`Admin créé : ${email}`);
  } else {
    console.log(`Admin déjà existant : ${email}`);
  }

  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({
      siteName: "UNIWÊ",
      tagline: "Import-export entre l'Afrique et l'Europe",
      legalTexts: { mentionsLegales, cgu, confidentialite },
      stats: [
        { value: "500+", label: "Envois réalisés" },
        { value: "2", label: "Pays desservis" },
        { value: "98%", label: "Clients satisfaits" },
      ],
    });
    console.log("Réglages par défaut créés");
  } else if (!settings.stats || settings.stats.length === 0) {
    settings.stats = [
      { value: "500+", label: "Envois réalisés" },
      { value: "2", label: "Pays desservis" },
      { value: "98%", label: "Clients satisfaits" },
    ];
    await settings.save();
    console.log("Stats par défaut ajoutées aux réglages existants");
  }

  const heroCount = await HeroSlide.countDocuments();
  if (heroCount === 0) {
    await HeroSlide.create({
      title: "UNIWÊ, votre pont entre l'Afrique et l'Europe",
      subtitle: "Import-export fiable entre la Côte d'Ivoire et la France",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=1920",
      ctaText: "Demander un devis",
      ctaLink: "/devis",
      order: 0,
      active: true,
    });
    console.log("Hero par défaut créé");
  }

  const locationCount = await Location.countDocuments();
  if (locationCount === 0) {
    await Location.create([
      {
        label: "Bureau France",
        country: "France",
        address: "Paris, France (adresse à préciser par l'administrateur)",
        lat: 48.8566,
        lng: 2.3522,
        hours: "Lun - Ven : 9h - 18h",
        order: 0,
        active: true,
      },
      {
        label: "Bureau Côte d'Ivoire",
        country: "Côte d'Ivoire",
        address: "Abidjan, Côte d'Ivoire (adresse à préciser par l'administrateur)",
        lat: 5.3599,
        lng: -4.0083,
        hours: "Lun - Ven : 8h - 17h",
        order: 1,
        active: true,
      },
    ]);
    console.log("Localisations par défaut créées");
  }

  const postCount = await Post.countDocuments();
  if (postCount === 0) {
    await Post.create({
      title: "Comment se passe une demande de devis ?",
      body: "Vous nous transmettez les détails de votre marchandise et de votre trajet, nous étudions votre demande et revenons vers vous rapidement avec une proposition adaptée. Chaque envoi est différent, c'est pourquoi nous personnalisons chaque devis.",
      order: 0,
    });
    console.log("Post par défaut créé");
  }

  const faqCount = await Faq.countDocuments();
  if (faqCount === 0) {
    await Faq.create([
      {
        question: "Combien de temps prend un envoi entre la France et la Côte d'Ivoire ?",
        answer:
          "Le délai dépend du type de marchandise et du mode de transport choisi. Nous vous communiquons une estimation précise dès l'étude de votre devis.",
        order: 0,
      },
      {
        question: "Mes marchandises sont-elles assurées pendant le transport ?",
        answer:
          "Nous mettons tout en œuvre pour sécuriser chaque envoi et vous informons des options disponibles selon la nature de votre marchandise.",
        order: 1,
      },
      {
        question: "Comment est calculé le prix de mon envoi ?",
        answer:
          "Nous ne fixons pas de tarif fixe en ligne : chaque envoi est différent (poids, volume, destination, type de marchandise). Vous recevez une proposition personnalisée après votre demande de devis.",
        order: 2,
      },
      {
        question: "Puis-je suivre l'avancement de ma demande ?",
        answer:
          "Oui, notre équipe reste joignable par WhatsApp ou par les coordonnées indiquées sur le site pour vous tenir informé à chaque étape.",
        order: 3,
      },
    ]);
    console.log("FAQ par défaut créée");
  }

  console.log("Seed terminé.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
