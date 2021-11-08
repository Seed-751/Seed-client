import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import Music from "../components/Music";
import Pagination from "../components/Pagination";
import paginate from "../utils/paginate";

const MusicBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 20px;
  margin-top: 10px;

  .link {
    width: 250px;
  }
`;

export default function MusicList({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalData = data.length;
  const pagedData = paginate(data, currentPage, 8);

  function handleChangePage(page) {
    setCurrentPage(page);
  }

  return (
    <>
      <MusicBox>
        {pagedData?.map((music) => (
          <Link
            key={music._id}
            to={`/musics/${music._id}`}
            className="link"
          >
            <Music key={music._id} music={music} />
          </Link>
        ))}
      </MusicBox>
      <Pagination
        pageSize={8}
        totalData={totalData}
        currentPage={currentPage}
        onPageChange={handleChangePage}
      />
    </>
  );
}

MusicList.propTypes = {
  data: PropTypes.array.isRequired,
};
