// Source helpers. Links point to a stable landing page or a PubMed search
// for the exact title, so every reference can be opened and checked by
// the reviewer; nothing here is a guessed DOI.
export const nice = (code, title) => ({ label: `NICE ${code.toUpperCase()}: ${title}`, url: `https://www.nice.org.uk/guidance/${code.toLowerCase()}` });
export const pm = (label, query) => ({ label, url: 'https://pubmed.ncbi.nlm.nih.gov/?term=' + encodeURIComponent(query || label) });
export const web = (label, url) => ({ label, url });
