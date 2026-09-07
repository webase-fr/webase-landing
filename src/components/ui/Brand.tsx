import Link from "next/link";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Webase — accueil">
      <svg aria-hidden="true" viewBox="0 0 144 108" fill="currentColor">
        <path d="M38 65H2l36 36V65ZM125 44l-23-6-24 23 21 40 26-57ZM123 17l-17 17 35 8-18-25ZM43 2v103h52L43 2Z" />
      </svg>
      <span>
        webase<span className="brand-dot">.</span>
      </span>
    </Link>
  );
}
