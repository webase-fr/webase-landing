"use client";

import { copy } from "@/lib/copy";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function Testimonials() {
  return (
    <Section className="bg-bg border-t border-border">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{copy.testimonials.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {copy.testimonials.items.map((item, idx) => (
            <div key={idx} className="bg-surface-1 p-8 rounded-3xl border border-border flex flex-col justify-between">
              <div className="mb-6">
                <svg className="w-8 h-8 text-brand mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.896 14.321 16.062 14.929 15.5C15.537 14.938 16.485 14.656 17.773 14.656L17.773 16.031C16.941 16.118 16.333 16.368 15.949 16.781C15.565 17.194 15.373 17.777 15.373 18.531L15.373 21L14.017 21ZM5.017 21L5.017 18C5.017 16.896 5.321 16.062 5.929 15.5C6.537 14.938 7.485 14.656 8.773 14.656L8.773 16.031C7.941 16.118 7.333 16.368 6.949 16.781C6.565 17.194 6.373 17.777 6.373 18.531L6.373 21L5.017 21ZM5.483 3C3.655 3 2.109 4.295 1.705 6.075L7.795 14.925C8.199 15.145 8.647 15.250 9.101 15.250C9.897 15.250 10.635 14.975 11.233 14.475C11.831 13.975 12.183 13.295 12.183 12.500L12.183 5.483C12.183 4.103 11.083 3 8.700 3L5.483 3ZM14.483 3C12.655 3 11.109 4.295 10.705 6.075L16.795 14.925C17.199 15.145 17.647 15.250 18.101 15.250C18.897 15.250 19.635 14.975 20.233 14.475C20.831 13.975 21.183 13.295 21.183 12.500L21.183 5.483C21.183 4.103 20.083 3 17.700 3L14.483 3Z" />
                </svg>
                <p className="text-text font-medium text-lg leading-relaxed text-balance">
                  &quot;{item.text}&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center font-bold text-brand uppercase text-sm border border-brand/10">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-text text-sm">{item.author}</div>
                  <div className="text-xs text-text-muted uppercase tracking-wider">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
