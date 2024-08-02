"use client";
import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOpcuaContext } from "@/context/opcua-context";

type Props = {
  nodeId: string;
  nodeName: string;
};
const OpcUaSidebarNode = ({ nodeId, nodeName }: Props) => {
  const [givenName, setGivenName] = React.useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { setOpcuaNodes, opcuaNodes } = useOpcuaContext();

  function checkGivenName(name: string) {
    if (opcuaNodes.find((node) => node.givenName === name)) {
      setFeedbackMessage(
        "Given name is not unique. Please choose another name.",
      );
    } else {
      setFeedbackMessage("");
      setGivenName(name);
    }
  }

  function handleAddClick() {
    if (feedbackMessage === "") {
      setOpcuaNodes([
        ...opcuaNodes,
        {
          id: nodeId,
          nodeName: nodeName,
          givenName: givenName,
        },
      ]);
      setOpen(false);
    }
  }

  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger asChild>
        <p onClick={() => setOpen(true)}>{nodeName}</p>
      </PopoverTrigger>
      <PopoverContent>
        <Input
          placeholder="Provide name"
          onChange={(e) => checkGivenName(e.target.value)}
        />
        {feedbackMessage && (
          <p className="text-sm text-red-400 p-4">{feedbackMessage}</p>
        )}
        <Button className="w-full" onClick={handleAddClick}>
          Add
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default OpcUaSidebarNode;
