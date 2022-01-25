import React from "react";
import { Pagination as Paginationantd } from "antd";
import { useRouter } from "next/router";
import queryString from "query-string";

export default function Pagination(props) {
  const { totalProducts, page, start } = props;

  const totalPages = Math.ceil(totalProducts / start);

  const total = Math.ceil(totalProducts);

  const router = useRouter();

  const urlParse = queryString.parseUrl(router.asPath);

  const goToPage = (newPage) => {
    urlParse.query.page = newPage;
    console.log(newPage);
    const url = queryString.stringifyUrl(urlParse);

    router.push(url);
  };
  return (
    <div className="pagination">
      <Paginationantd
        defaultCurrent={page}
        total={totalProducts}
        onChange={goToPage}
        pageSize={11}
      />
    </div>
  );
}
