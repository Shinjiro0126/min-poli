"use client";

import Link from "next/link";

type BreadcrumbSegment = {
  path: string;
  label: string;
}

type Props = {
  segments: BreadcrumbSegment[];
}

export default function Breadcrumb({segments}: Props){
  return(
    <>
      <nav className="font-body flex items-center gap-2 mb-3">
        {segments.map(({path, label}, index) => (
          <div key={path} className="flex items-center gap-2">
            {index > 0 && <span>/</span>}
            <Link href={path} className="hover:underline hover:text-primary-700">
              {label}
            </Link>
          </div>  
        ))}
      </nav>
    </>
  );
}