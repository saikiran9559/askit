import Loading from "Components/common/Loading";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "Services/axiosInstance";
import duration from "Utils/duration";
import {
  AuthorName,
  ContainerRow,
  DetailsRow,
  MainContainer,
  Pagination,
  PostBody,
  PostContainerRow,
  PostLink,
  PostTime,
  TagContainer,
} from "./styled";

const Questions = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    perPage: 3,
    totalPages: 0,
    currentPage: 0,
  });
  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery(
    "questions",
    () =>
      apiInstance.get(
        `/questions/get/${pagination.perPage}/${pagination.currentPage + 1}`,
      ),
    { refetchOnWindowFocus: false },
  );

  const handlePageChange = (event) => {
    console.log(event.selected);
    setPagination({ ...pagination, currentPage: event.selected });
  };

  useEffect(() => {
    refetch();
  }, [pagination.currentPage, refetch]);

  useEffect(() => {
    if (data?.data?.totalquestions) {
      setPagination({
        ...pagination,
        totalPages: Math.ceil(
          parseInt(data?.data?.totalquestions) / pagination.perPage,
        ),
      });
    }
  }, [data]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }
  if (isError) {
    return <Loading>Error...</Loading>;
  }

  return (
    <MainContainer>
      <ContainerRow>
        <h3>Most Recent Questions</h3>
        <PostLink to="/questions/create">Want to Ask</PostLink>
      </ContainerRow>
      <PostContainerRow>
        {data.data?.questions?.map(({ _id, title, tags, author, date }) => {
          const diff = duration(date);
          return (
            <PostBody
              key={_id}
              onClick={() => navigate(`/questions/question/${_id}`)}
            >
              <h1>{title}</h1>
              <TagContainer>
                {tags.length > 0 &&
                  tags.map((item, index) => <p key={index}>{item}</p>)}
              </TagContainer>
              <DetailsRow>
                <AuthorName>{author.name}</AuthorName>
                <PostTime>{`Asked ${Object.values(diff)[0]} ${
                  Object.keys(diff)[0]
                } ago`}</PostTime>
              </DetailsRow>
            </PostBody>
          );
        })}
      </PostContainerRow>
      {isFetching && <Loading>Loading...</Loading>}
      <Pagination
        pageCount={pagination.totalPages}
        forcePage={pagination.currentPage}
        onPageChange={handlePageChange}
      />
    </MainContainer>
  );
};

export default Questions;
