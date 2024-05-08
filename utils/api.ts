const createURL = (path: string) => {
  return window.location.origin + path;
};
export const createNewEntry = async () => {
  const res = await fetch(new Request(createURL("/api/journal")), {
    method: "POST",
  });
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
export const updateEntry = async (id: string, content: any) => {
  const res = await fetch(new Request(createURL(`/api/journal/${id}`)), {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
export const askQuestion = async (question: string) => {
  const res = await fetch(new Request(createURL(`/api/journal/question`)), {
    method: "POST",
    body: JSON.stringify({ question }),
  });
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
export const deleteEntry = async (id: string) => {
  const res = await fetch(new Request(createURL(`/api/journal/${id}`)), {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
