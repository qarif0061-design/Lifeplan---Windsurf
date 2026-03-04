import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { 
  Target, 
  LayoutDashboard, 
  Calendar, 
  CheckCircle2, 
  Settings, 
  Shield, 
  BarChart3,
  Plus,
  Search
} from "lucide-react";

const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all md:hidden"
      >
        <Search className="h-6 w-6" />
      </button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => navigate("/dashboard"))}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/goals"))}>
              <Target className="mr-2 h-4 w-4" />
              <span>Goals</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/planning"))}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Weekly Planning</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/check-in"))}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              <span>Daily Check-in</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => runCommand(() => navigate("/goals"))}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create New Goal</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/strategy"))}>
              <Shield className="mr-2 h-4 w-4" />
              <span>Update Strategy</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/insights"))}>
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>View Insights</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => runCommand(() => navigate("/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandMenu;