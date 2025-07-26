"use client";

import { useState } from "react";
import InputArea from "./InputArea";
import Suggestions from "./Suggestions";
import Suggestion from "./Sugguestion";

export default function Prompt() {
  const [isSubmiting, setIsSumiting] = useState(false);
  return (
    <>
      <Suggestions>
        <Suggestion
          setIsSubmiting={setIsSumiting}
          prompt="It looks like you're writing an email, would you like help drafting it?"
        />
        <Suggestion
          setIsSubmiting={setIsSumiting}
          prompt="Generate a report on customer feedback for the last 3 months."
        />
        <Suggestion
          setIsSubmiting={setIsSumiting}
          prompt="Analyze this month's sales performance
"
        />
      </Suggestions>
      <InputArea isSubmiting={isSubmiting} />
    </>
  );
}
