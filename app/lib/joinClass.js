export default function joinClass(...classes) {
  return classes.filter(Boolean).join(" ");
}
