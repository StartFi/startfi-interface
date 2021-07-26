import React from 'react';
import styled from 'styled-components';

const PaginationStyle = styled.div`
 
a{
    text-decoration: none;
  }
  
  p, li, a{
    font-size: 14px;
  }

    
  .col {
      display: block;
      float:left;
      margin: 1% 0 1% 1.6%;
  }
  
  .col:first-of-type {
    margin-left: 0;
  }
  
  .container{
    width: 100%;
    max-width: 940px;
    margin: 0 auto;
    position: relative;
    text-align: center;
  }
  
  .cf:before,
  .cf:after {
      content: " ";
      display: table;
  }
  
  .cf:after {
      clear: both;
  }
  
  .cf {
      *zoom: 1;
  }
  

  .pagination{
    padding: 30px 0;
  }
  
  .pagination ul{
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  .pagination a{
    display: inline-block;
    padding: 10px 18px;
    color: #222;
  }
    
  .p1 a{
    width: 40px;
    height: 40px;
    line-height: 40px;
    padding: 0;
    text-align: center;
  }
  
  .p1 a.is-active{
    background-color: #000000;
    border-radius: 100%;
    color: #fff;
  }
`;


interface PageProps {
    itemCounts?: number,
    pageSize?: number,
   // onPageChange: () => void,
    currentPage?: number,
    location?: number
}

const Pagination: React.FC<PageProps> = ({ itemCounts, pageSize, currentPage, location }) => {
    return (
        <React.Fragment>
            <PaginationStyle>
                <div className="container">
                    <div className="pagination p1">
                        <ul>
                            <a href="#"><li>prev</li></a>
                            <a className="is-active" href="#"><li>1</li></a>
                            <a href="#"><li>2</li></a>
                            <a href="#"><li>3</li></a>
                            <a href="#"><li>4</li></a>
                            <a href="#"><li>5</li></a>
                            <a href="#"><li>6</li></a>
                            <a href="#"><li>next</li></a></ul>
                    </div>
                </div>
            </PaginationStyle>
        </React.Fragment>
    );
}

export default Pagination;