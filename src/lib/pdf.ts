import { Dish, Profile } from './supabase'
import { calculateDishMetrics, formatEuros, formatPct } from './calculations'

export const generateDishPDF = async (dish: Dish, profile: Profile) => {
  const { default: jsPDF } = await import('jspdf')
  const { default: autoTable } = await import('jspdf-autotable')

  const doc = new jsPDF()
  const metrics = calculateDishMetrics(dish.ingredients, dish.covers, dish.target_food_cost)
  const today = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })

  // ─── En-tête ───────────────────────────────────────────
  doc.setFillColor(253, 250, 244) // creme
  doc.rect(0, 0, 210, 40, 'F')

  doc.setFontSize(10)
  doc.setTextColor(160, 116, 90) // brun-light
  doc.setFont('helvetica', 'normal')
  doc.text('Costyfood', 20, 15)
  doc.text(`Généré le ${today}`, 20, 22)

  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(44, 26, 14) // brun
  doc.text(dish.name, 20, 35)

  // ─── Identité ───────────────────────────────────────────
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(107, 66, 38) // brun-mid
  let y = 50

  const categoryLabels: Record<string, string> = {
    entrée: 'Entrée', plat: 'Plat principal', dessert: 'Dessert', autre: 'Autre'
  }
  doc.text(`Catégorie : ${categoryLabels[dish.category] || dish.category}`, 20, y)
  doc.text(`Couverts : ${dish.covers}`, 110, y)
  y += 8
  doc.text(`Food cost cible : ${dish.target_food_cost}%`, 20, y)
  y += 10

  // ─── Tableau ingrédients ────────────────────────────────
  autoTable(doc, {
    startY: y,
    head: [['Ingrédient', 'Quantité', 'Prix/kg', 'Coût']],
    body: dish.ingredients.map(ing => [
      ing.name,
      `${ing.qty_grams} g`,
      `${ing.price_per_kg.toFixed(2)} €/kg`,
      `${ing.cost.toFixed(3)} €`,
    ]),
    foot: [['Total coût matière', '', '', `${metrics.totalCost.toFixed(2)} €`]],
    theme: 'striped',
    headStyles: { fillColor: [242, 133, 74], textColor: 255, fontStyle: 'bold' },
    footStyles: { fillColor: [232, 213, 196], textColor: [44, 26, 14], fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [253, 232, 216] },
    styles: { fontSize: 10, cellPadding: 4 },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { halign: 'right' },
      2: { halign: 'right' },
      3: { halign: 'right' },
    },
  })

  y = (doc as any).lastAutoTable.finalY + 12

  // ─── Résultats financiers ───────────────────────────────
  doc.setFillColor(242, 133, 74)
  doc.roundedRect(14, y, 182, 8, 2, 2, 'F')
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text('Résultats financiers', 20, y + 5.5)
  y += 14

  const results = [
    ['Coût matière / assiette', formatEuros(metrics.costPerCover)],
    ['Food cost cible', formatPct(dish.target_food_cost)],
    ['Prix de vente conseillé', formatEuros(metrics.priceAdvised)],
    ['Marge brute', `${formatEuros(metrics.marginEuros)} (${formatPct(metrics.marginPct)})`],
  ]

  doc.setFontSize(10)
  results.forEach(([label, value], i) => {
    if (i % 2 === 0) {
      doc.setFillColor(253, 250, 244)
      doc.rect(14, y - 3, 182, 8, 'F')
    }
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(107, 66, 38)
    doc.text(label, 20, y + 2)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(44, 26, 14)
    doc.text(value, 196, y + 2, { align: 'right' })
    y += 9
  })
  y += 6

  // ─── Allergènes ─────────────────────────────────────────
  if (dish.allergens && dish.allergens.length > 0) {
    doc.setFillColor(253, 232, 216)
    doc.roundedRect(14, y, 182, 8, 2, 2, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(242, 133, 74)
    doc.text('Allergènes', 20, y + 5.5)
    y += 14
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(107, 66, 38)
    doc.text(dish.allergens.join(' · '), 20, y)
    y += 12
  }

  // ─── Notes ──────────────────────────────────────────────
  if (dish.notes) {
    doc.setFillColor(232, 242, 232)
    doc.roundedRect(14, y, 182, 8, 2, 2, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(122, 158, 126)
    doc.text('Notes', 20, y + 5.5)
    y += 14
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(107, 66, 38)
    const lines = doc.splitTextToSize(dish.notes, 170)
    doc.text(lines, 20, y)
  }

  // ─── Pied de page ───────────────────────────────────────
  doc.setFontSize(8)
  doc.setTextColor(160, 116, 90)
  doc.setFont('helvetica', 'italic')
  doc.text('Généré par Costyfood — costyfood.fr', 105, 287, { align: 'center' })
  doc.text(`Prix basés sur cotations FranceAgriMer — ${today}`, 105, 292, { align: 'center' })

  doc.save(`fiche-${dish.name.toLowerCase().replace(/[\s/]+/g, '-')}.pdf`)
}
