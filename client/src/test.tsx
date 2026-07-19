import React from "react";

export default function Test() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return <form onSubmit={onSubmit}></form>;
}