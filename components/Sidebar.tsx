"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import { useLayout } from "./LayoutProvider";

const categories = [
  {
    id: "inzynieria-kontekstu",
    title: "Inżynieria Kontekstu",
    items: [
      { title: "Wprowadzenie do Inżynierii Kontekstu", href: "/samouczki/inzynieria-kontekstu/wprowadzenie" },
      { title: "Pisanie Kontekstu", href: "/samouczki/inzynieria-kontekstu/pisanie-kontekstu" },
      { title: "Wybieranie Kontekstu", href: "/samouczki/inzynieria-kontekstu/wybieranie-kontekstu" },
      { title: "Kompresja Kontekstu", href: "/samouczki/inzynieria-kontekstu/kompresja-kontekstu" },
      { title: "Izolacja Kontekstu", href: "/samouczki/inzynieria-kontekstu/izolacja-kontekstu" },
      { title: "Praktyczne Przykłady", href: "/samouczki/inzynieria-kontekstu/praktyczne-przyklady" },
    ],
  },
  {
    id: "narzedzia-mcp",
    title: "Narzędzia MCP",
    items: [
      { title: "Wprowadzenie do Protokołu MCP", href: "/samouczki/narzedzia-mcp/wprowadzenie-do-mcp" },
      { title: "Budowanie Serwera MCP", href: "/samouczki/narzedzia-mcp/budowanie-serwera-mcp" },
      { title: "Integracja z Agentami", href: "/samouczki/narzedzia-mcp/integracja-z-agentami" },
      { title: "Zaawansowane Funkcje MCP", href: "/samouczki/narzedzia-mcp/zaawansowane-funkcje" },
      { title: "Praktyczne Tutoriale", href: "/samouczki/narzedzia-mcp/praktyczne-tutoriale" },
    ],
  },
  {
    id: "programowanie",
    title: "Programowanie",
    items: [
      { title: "Podstawy Programowania dla Agentów AI", href: "/samouczki/programowanie/podstawy-programowania" },
      { title: "JavaScript dla Agentów", href: "/samouczki/programowanie/javascript-dla-agentow" },
      { title: "Python dla AI", href: "/samouczki/programowanie/python-dla-ai" },
    ],
  },
  {
   id: "uzycie-agentow",
   title: "Użycie Agentów",
   items: [
     { title: "Użycie Agentów", href: "/samouczki/uzycie-agentow" },
   ],
 },
  {
   id: "przeplywy-pracy",
   title: "Przepływy Pracy",
   items: [
     { title: "Przepływy Pracy", href: "/samouczki/przeplywy-pracy" },
   ],
 },
];

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useLayout();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const sidebarContent = (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Kategorie</h2>
      <Accordion.Root type="multiple" value={openItems} onValueChange={setOpenItems}>
        {categories.map((category) => (
          <Accordion.Item key={category.id} value={category.id} className="mb-2">
            <Accordion.Header>
              <Accordion.Trigger className="flex items-center justify-between w-full p-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md group">
                <span className="font-medium">{category.title}</span>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="pl-4">
              <ul className="space-y-1">
                {category.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                      onClick={closeSidebar}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <Dialog.Root open={isSidebarOpen} onOpenChange={closeSidebar}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 md:hidden" />
          <Dialog.Content className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 overflow-y-auto md:hidden">
            {sidebarContent}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}