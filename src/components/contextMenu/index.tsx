/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { clsx } from "clsx";
import type { ReactNode } from "react";
import React, { useState } from "react";
import { v4 } from "uuid";

import {
  CaretRightIcon,
  CheckIcon,
  CropIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  FrameIcon,
  GridIcon,
  LightningBoltIcon,
  Link2Icon,
  MixerHorizontalIcon,
  PersonIcon,
  TransparencyGridIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import {  useGridStore, useStore } from "@components/dashboard";
import { Position } from "reactflow";

interface RadixMenuItem {
  label: string;
  shortcut?: string;
  icon?: ReactNode;
  onClickFunction?: () => void;
}

interface User {
  name: string;
  url?: string;
}

type CheckState = boolean | "indeterminate";



const users: User[] = [
  {
    name: "Adam",
    url: "https://github.com/adamwathan.png",
  },
  {
    name: "Steve",
    url: "https://github.com/steveschoger.png",
  },
  {
    name: "Robin",
    url: "https://github.com/robinmalfait.png",
  },
];

interface ContextMenuProps {
  children: React.ReactNode;
}

const ContextMenu = (props: ContextMenuProps) => {
  const [showGrid, setShowGrid] = useState(false);
  const [showUi, setShowUi] = useState(false);
  const { toggleGrid, gridOn } = useGridStore();
  const { onNodesChange, nodes, removeSelectedNodes, removeSelectedEdges } = useStore(); 
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  

const regionToolMenuItems: RadixMenuItem[] = [
  {
    label: "Frame",
    icon: <FrameIcon className="mr-2 h-3.5 w-3.5" />,
    shortcut: "⌘+F",
  },
  {
    label: "Delete",
    icon: <TrashIcon className="mr-2 h-3.5 w-3.5" />,
    shortcut: "Entf",
    onClickFunction: () => {
      removeSelectedNodes()
      removeSelectedEdges()
    }
  },
];


  const generalMenuItems: RadixMenuItem[] = [
    {
      label: "New Activity",
      icon: <LightningBoltIcon className="mr-2 h-3.5 w-3.5" />,
      shortcut: "⌘+N",
      onClickFunction: () => {
  
        onNodesChange([{
          item:   {
            id: v4(),
            data: { label: 'test' },
            position: { x: x, y: y },
            sourcePosition: Position.Right,
            type: 'input',
          },
        type: "add"}])
      } 
    },
    {
      label: "Settings",
      icon: <MixerHorizontalIcon className="mr-2 h-3.5 w-3.5" />,
      shortcut: "⌘+,",
    },
    ];

  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger asChild onContextMenu={(e: any) => {
        setX(e.clientX);
        setY(e.clientY);
      }} >
        {props.children}
      </ContextMenuPrimitive.Trigger>

      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content
          className={clsx(
            "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
            "w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56",
            "bg-white dark:bg-gray-800"
          )}
        >
          {generalMenuItems.map(({ label, icon, shortcut, onClickFunction }, i) => (
            <ContextMenuPrimitive.Item
              key={`${label}-${i}`}
              className={clsx(
                "flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                "text-gray-400 focus:bg-gray-50 dark:text-gray-500 dark:focus:bg-gray-900"
              )}
              onClick={onClickFunction}
            >
              {icon}
              <span className="flex-grow text-gray-700 dark:text-gray-300">
                {label}
              </span>
              {shortcut && <span className="text-xs">{shortcut}</span>}
            </ContextMenuPrimitive.Item>
          ))}

          <ContextMenuPrimitive.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />

          <ContextMenuPrimitive.CheckboxItem
            onClick={() => toggleGrid()}
            checked={gridOn}
            onCheckedChange={(state: CheckState) => {
              if (state !== "indeterminate") {
                setShowGrid(state);
              }
            }}
            className={clsx(
              "flex w-full cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
              "text-gray-400 focus:bg-gray-50 dark:text-gray-500 dark:focus:bg-gray-900"
            )}
          >
            {gridOn ? (
              <GridIcon className="mr-2 h-4 w-4" />
            ) : (
              <TransparencyGridIcon className="mr-2 h-3.5 w-3.5 text-gray-700 dark:text-gray-300" />
            )}
            <span className="flex-grow text-gray-700 dark:text-gray-300">
              Show Grid
            </span>
            <ContextMenuPrimitive.ItemIndicator>
              <CheckIcon className="h-3.5 w-3.5" />
            </ContextMenuPrimitive.ItemIndicator>
          </ContextMenuPrimitive.CheckboxItem>

          <ContextMenuPrimitive.CheckboxItem
            checked={showUi}
            onCheckedChange={(state: CheckState) => {
              if (state !== "indeterminate") {
                setShowUi(state);
              }
            }}
            className={clsx(
              "flex w-full cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
              "text-gray-400 focus:bg-gray-50 dark:text-gray-500 dark:focus:bg-gray-900"
            )}
          >
            {showUi ? (
              <EyeOpenIcon className="mr-2 h-3.5 w-3.5" />
            ) : (
              <EyeClosedIcon className="mr-2 h-3.5 w-3.5" />
            )}
            <span className="flex-grow text-gray-700 dark:text-gray-300">
              Show UI
            </span>
            <ContextMenuPrimitive.ItemIndicator>
              <CheckIcon className="h-3.5 w-3.5" />
            </ContextMenuPrimitive.ItemIndicator>
          </ContextMenuPrimitive.CheckboxItem>

          <ContextMenuPrimitive.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />

          <ContextMenuPrimitive.Label className="select-none px-2 py-2 text-xs text-gray-700 dark:text-gray-200">
            Region Tools
          </ContextMenuPrimitive.Label>

          {regionToolMenuItems.map(({ label, icon, shortcut, onClickFunction }, i) => (
            <ContextMenuPrimitive.Item onClick={onClickFunction}
              key={`${label}-${i}`}
              className={clsx(
                "flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                "text-gray-400 focus:bg-gray-50 dark:text-gray-500 dark:focus:bg-gray-900"
              )}
            >
              {icon}
              <span className="flex-grow text-gray-700 dark:text-gray-300">
                {label}
              </span>
              {shortcut && <span className="text-xs">{shortcut}</span>}
            </ContextMenuPrimitive.Item>
          ))}

          <ContextMenuPrimitive.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />

          <ContextMenuPrimitive.Sub>
            <ContextMenuPrimitive.SubTrigger
              className={clsx(
                "flex w-full cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                "text-gray-400 focus:bg-gray-50 dark:text-gray-500 dark:focus:bg-gray-900"
              )}
            >
              <Link2Icon className="mr-2 h-3.5 w-3.5" />
              <span className="flex-grow text-gray-700 dark:text-gray-300">
                Share
              </span>
              <CaretRightIcon className="h-3.5 w-3.5" />
            </ContextMenuPrimitive.SubTrigger>
            <ContextMenuPrimitive.Portal>
              <ContextMenuPrimitive.SubContent
                className={clsx(
                  "radix-side-right:animate-scale-in origin-radix-context-menu",
                  "w-full rounded-md px-1 py-1 text-xs shadow-md",
                  "bg-white dark:bg-gray-800"
                )}
              >
                {users.map(({ name, url }, i) => (
                  <ContextMenuPrimitive.Item
                    key={`${name}-${i}`}
                    className={clsx(
                      "flex w-28 cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none md:w-32",
                      "text-gray-400 focus:bg-gray-50 dark:text-gray-500 dark:focus:bg-gray-900"
                    )}
                  >
                    {url ? (
                      <Image
                        className="mr-2.5 h-6 w-6 rounded-full"
                        src={url}
                        width={24}
                        height={24}
                        alt="TODO"
                      />
                    ) : (
                      <PersonIcon className="mr-2.5 h-6 w-6" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">
                      {name}
                    </span>
                  </ContextMenuPrimitive.Item>
                ))}
              </ContextMenuPrimitive.SubContent>
            </ContextMenuPrimitive.Portal>
          </ContextMenuPrimitive.Sub>
        </ContextMenuPrimitive.Content>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  );
};

export default ContextMenu;
