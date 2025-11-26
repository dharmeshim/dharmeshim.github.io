export const scrollToSection = (sectionId: string) => {
  const element = document.querySelector(`#${sectionId}`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const getSectionId = (href: string) => {
  return href.replace("#", "");
}; 