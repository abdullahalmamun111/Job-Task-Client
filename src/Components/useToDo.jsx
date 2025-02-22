import { useQuery } from '@tanstack/react-query';
import React from 'react';

const useToDo = () => {

	const { data: todo = [], refetch } = useQuery({
		queryKey: ["todo"],
		queryFn: async () => {
		  const res = await axiosPublic.get("/to-do");
		  return res.data;
		},
	  });
	return {todo,refetch}
};

export default useToDo;