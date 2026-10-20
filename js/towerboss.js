// Ritter Manager – Turm-Bosse: Auswahl je Etage und Kampftricks (Aufladen, Helfer, Spiegeln, Phase, Wiedergeburt, Versiegeln)
// Boss auf Etage n (n durch 5 teilbar): Index i in TBOSS, c = Schatten-Durchlauf (0 bis Etage 100, danach 1, 2, …)
const tbossAt=n=>({i:(n/5-1)%TBOSS.length,c:Math.floor((n-1)/100)});
