# Triggers_Report

(주)트리거스 입사 과제 진행을 위해 제작한 레포지토리입니다.

소스 코드 중 루트 경로의 <code>triggers.erd.drawio</code>에서 ERD를 확인할 수 있습니다. <br/>

<p style="border:1px;color:#b3b3b3;">
<h1>목차 Contents table</h1>

각 제목을 클릭할 경우 곧바로 해당 파트로 이동이 가능합니다.

<ol type="I">
  <li> <a href="#intent">설계 의도</a></li>
  <li>
    <a href="#feature">기능 설명</a>
    <ol type="i">
      <li><a href="#auth">인증 도메인</a></li>
      <li><a href="#word">단어장 도메인</a></li>
      <li><a href="#quiz">퀴즈 도메인</a></li>
      <li><a href="#wrong">오답노트 도메인</a></li>
      <li><a href="#admin">관리자 도메인</a></li>
    </ol>
  </li>
  <li><a href="#execute">실행 방법</a></li>
  <!--
  <li> <a href="#3">트러블 슈팅</a><br/></li>
  <li> <a href="#4">회고</a><br/></li>
  -->
</ol>
</p>

<p id="intent">
<h1>설계 의도</h1>

<p>
  기술 문서에 적힌 기획에 더해 확장성 있고 단단한 구조를 지향하여 구성하였습니다. <br/>
  OOP와 AOP를 함께 도입하였으며, DI / IoC를 적극적으로 활용하였습니다. <br/> 
  이를 통해 코드의 확장 및 변경, 테스팅 등에서 효율성을 추구하였습니다.
</p>

<p>
  winston logger를 사용하여 편리하고 확장성 있는 로깅 시스템을 구축하였습니다.
  swagger docs를 활용하여 가독성 좋은 API 문서를 작성하였습니다.
  Repository Pattern을 활용하여 SQL 처리 로직을 분리하였습니다.
</p>

</p>
<p id="feature">
<h1>기능 설명</h1>
도메인 별로 기능을 설명합니다.<br/>
각각의 리스트를 클릭할 경우 상세 요청 및 응답 객체에 대한 설명이 나옵니다.<br/>
<h2 id="auth">인증 도메인 ("/auth")</h2>
사용자 회원가입, 로그인, 회원탈퇴 등을 지원합니다.
<ul>
  <li>
    <details>
      <summary>
        <h3>POST /signup</h3>
        회원가입입니다.<br/>
        입력값에 맞추어 새로운 계정을 생성합니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약 조건</th>
        </tr>
        <tr>
          <td>Body</td>
          <td>email</td>
          <td>
            <li>Type: String </li>
            <li>Unique Value</li>
            <li>Not Null</li>
            <li>Length: 5 ~ 50</li>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>password</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Length: 8 ~ 50</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>201</td>
          <td>Created</td>
          <td>입력값을 제약조건에 맞게 입력한 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약조건</th>
              </tr>
              <tr>
                <td>id</td>
                <td>
                  <li>Type: Number</li>
                  <li>Not Null</li>
                  <li>Auto Increment</li>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>제약조건에 일치하지 않는 입력값</td>
          <td></td>
        </tr>
        <tr>
          <td>409</td>
          <td>Conflict</td>
          <td>이미 존재하는 아이디</td>
          <td/>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
  <li>
    <details>
      <summary>
        <h3>POST /signin</h3>
        로그인 기능입니다.<br/>
        올바른 아이디와 비밀번호를 입력하면 로그인에 성공하여 특정 계정에 접속할 수 있습니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약 조건</th>
        </tr>
        <tr>
          <td>Body</td>
          <td>email</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
          </td>
        </tr>
        <tr>
          <td/>
          <td>password</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>올바른 아이디와 비밀번호로 성공적으로 로그인한 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약 조건</th>
              </tr>
              <tr>
                <td>access_token</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                  <li>Bearer Token</li>
                </td>
              </tr>
              <tr>
                <td>refresh_token</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                  <li>Bearer Token</li>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>비밀번호가 일치하지 않는 경우</td>
          <td/>
        </tr>
        <tr>
          <td>404</td>
          <td>Not Found</td>
          <td>아이디에 해당하는 계정을 찾을 수 없는 경우</td>
          <td/>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
  <li>
    <details>
      <summary>
        <h3>DELETE /unsub</h3>
        회원탈퇴입니다.<br/>
        로그인한 상태에서 올바른 비밀번호를 입력하면 해당 계정을 영구히 삭제합니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약 조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력받습니다</li>
            <li>Bearer Token 형식</li>
          </td>
        </tr>
        <tr>
          <td>Body</td>
          <td>password</td>
          <td>
            <li>계정의 비밀번호를 입력</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>204</td>
          <td>No Content</td>
          <td>성공적으로 계정을 삭제한 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약조건</th>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>Header의 authorization을 입력받지 못한 경우</td>
          <td/>
        </tr>
        <tr>
          <td>403</td>
          <td>Forbidden</td>
          <td>JWT 토큰 계정과 비밀번호가 일치하지 않는 경우</td>
          <td/>
        </tr>
        <tr>
          <td>404</td>
          <td>Not Found</td>
          <td>존재하지 않는 계정에 접근 시도</td>
          <td/>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
  <li>
    <details>
      <summary>
        <h3>GET /refresh</h3>
        리프레시 토큰으로 액세스 토큰을 재발급받습니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Refresh Token을 입력</li>
            <li>Bearer Token</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>Access Token을 성공적으로 재발급받음</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약조건</th>
              </tr>
              <tr>
                <td>accessToken</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                  <li>Bearer Token</li>
                </td>
              </tr>
              <tr>
                <td>refreshToken</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                  <li>Bearer Token</li>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>authorization이 비어 있거나 Bearer Token 형식이 아닌 경우</td>
          <td/>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>authorization이 유효하지 않을 경우</td>
          <td/>
        </tr>
        <tr>
          <td>404</td>
          <td>Not Found</td>
          <td>존재하지 않는 계정에 대해 토큰 발급 요청</td>
          <td/>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
</ul>
<h2 id="word">단어장 도메인 ("/word")</h2>
유저는 단어장에 단어를 조회, 삭제, 수정, 등록 할 수 있습니다. 예시) apple 사과
<ul>
  <li>
    <details>
      <summary>
        <h3>POST /new</h3>
        단어장에 단어를 추가합니다. <br/>
        영단어와 한글 뜻을 입력할 수 있습니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력받습니다</li>
            <li>Bearer Token 형식</li>
          </td>
        </tr>
        <tr>
          <td>Body</td>
          <td>word</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>영어 대소문자</li>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>mean</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>201</td>
          <td>Created</td>
          <td>올바른 값을 입력하여 요청에 성공한 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약 조건</th>
              </tr>
              <tr>
                <td>word_id</td>
                <td>
                  <li>Type: Number</li>
                  <li>Not Null</li>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>입력값이 제약조건에 맞지 않는 경우</td>
          <td/>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>Header의 authorization이 유효하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>409</td>
          <td>Conflict</td>
          <td>중복 단어를 추가하는 경우</td>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
  <li>
    <details>
      <summary>
        <h3>GET /list</h3>
        단어장의 단어 리스트를 조회합니다. <br/>
        한 페이지 당 단어를 10개씩 조회할 수 있으며, 페이지는 0 또는 자연수입니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력받습니다</li>
            <li>Bearer Token 형식</li>
          </td>
        </tr>
        <tr>
          <td>Query</td>
          <td>page</td>
          <td>
            <li>Type: Number</li>
            <li>Nullable (Default : 0)</li>
            <li>0 <= page인 자연수</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>성공적으로 조회한 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약 조건</th>
              </tr>
              <tr>
                <td>words</td>
                <td>
                  <table>
                    <tr>
                      <th>키</th>
                      <th>제약 조건</th>
                    </tr>
                    <tr>
                      <td>word_id</td>
                      <td>
                        <li>Type: Number</li>
                        <li>Not Null</li>
                        <li>0 <= word_id인 자연수</li>
                      </td>
                    </tr>
                    <tr>
                      <td>word</td>
                      <td>
                        <li>Type: String</li>
                        <li>Not Null</li>
                        <li>A-Za-z의 정규식을 따르는 문자열</li>
                      </td>
                    </tr>
                    <tr>
                      <td>mean</td>
                      <td>
                        <li>Type: String</li>
                        <li>Not Null</li>
                        <li>word에 해당하는 단어의 뜻</li>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>page 쿼리의 값이 Numeric하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorization</td>
          <td>Header의 authorization이 유효하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>404</td>
          <td>Not Found</td>
          <td>페이지에 해당하는 단어가 없을 경우</td>
          <td/>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
  <li>
    <details>
      <summary>
        <h3>GET /rand</h3>
        단어장의 단어를 랜덤으로 조회합니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력합니다</li>
            <li>Bearer Token</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>조회에 성공하는 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약 조건</th>
              </tr>
              <tr>
                <td>word_id</td>
                <td>
                  <li>Type: Number</li>
                  <li>Not Null</li>
                  <li>0 <= word_id인 자연수</li>
                </td>
              </tr>
              <tr>
                <td>word</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                  <li>A-Za-z의 정규식을 따르는 문자열</li>
                </td>
              </tr>
              <tr>
                <td>mean</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                  <li>word에 해당하는 단어의 뜻</li>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorization</td>
          <td>authorization이 유효하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
  <li>
    <details>
      <summary>
        <h3>GET /:word_id</h3>
        단어장에 있는 단어를 조회합니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력합니다</li>
            <li>Bearer Token 형식</li>
          </td>
        </tr>
        <tr>
          <td>Param</td>
          <td>word_id</td>
          <td>
            <li>Type: Number</li>
            <li>Not Null</li>
            <li>0 <= word_id인 자연수</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>조회에 성공하는 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약 조건</th>
              </tr>
              <tr>
                <td>word_id</td>
                <td>
                  <li>Type: Number</li>
                  <li>Not Null</li>
                  <li>0 <= word_id인 자연수</li>
                </td>
              </tr>
              <tr>
                <td>word</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                  <li>A-Za-z의 정규식을 따르는 문자열</li>
                </td>
              </tr>
              <tr>
                <td>mean</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                  <li>word에 해당하는 단어의 뜻</li>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>word_id 파라미터의 값이 Numeric하지 않은 경우</td>
          <td></td>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>authorization의 값이 유효하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>404</td>
          <td>Not Found</td>
          <td>자신의 단어장에 등록되지 않은 단어 아이디</td>
          <td/>
          <!--403 에러와 404 에러를 통합하였음-->
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
  <li>
    <details>
      <summary>
        <h3>PATCH /:word_id</h3>
        단어장에 등록된 단어를 수정합니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력합니다</li>
            <li>Bearer Token 형식</li>
          </td>
        </tr>
        <tr>
          <td>Param</td>
          <td>word_id</td>
          <td>
            <li>Type: Number</li>
            <li>Not Null</li>
            <li>0 <= word_id인 자연수</li>
          </td>
        </tr>
        <tr>
          <td>Body</td>
          <td>word</td>
          <td>
            <li>Type: String</li>
            <li>Nullable (json 상에서 누락 가능 / null 금지)</li>
            <li>A-Za-z의 정규식을 따르는 문자열</li>
          </td>
        </tr>
        <tr>
          <td/>
          <td>mean</td>
          <td>
            <li>Type: String</li>
            <li>Nullable (json 상에서 누락 가능 / null 금지)</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>조회에 성공하는 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약 조건</th>
              </tr>
              <tr>
                <td>word_id</td>
                <td>
                  <li>Type: Number</li>
                  <li>Not Null</li>
                  <li>0 <= word_id인 자연수</li>
                </td>
              </tr>
              <tr>
                <td>word</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                  <li>A-Za-z의 정규식을 따르는 문자열</li>
                </td>
              </tr>
              <tr>
                <td>mean</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                  <li>word에 해당하는 단어의 뜻</li>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>파라미터 / 요청 바디의 제약조건 위반</td>
          <td/>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>authorization의 값이 유효하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>404</td>
          <td>Not Found</td>
          <td>단어장에 등록되지 않은 단어의 아이디로 요청</td>
          <td/>
        </tr>
        <!--403과 404 통합-->
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
  <li>
    <details>
      <summary>
        <h3>DELETE /:word_id</h3>
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력</li>
            <li>Bearer Token</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>204</td>
          <td>No Content</td>
          <td>성공적으로 해당 단어를 단어장에서 삭제</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약 조건</th>
              </tr>
              <tr>
                <td/>
                <td/>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>word_id 파라미터가 Numeric하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>authorization의 값이 유효하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>404</td>
          <td>Not Found</td>
          <td>단어장에 해당 아이디의 단어가 없음</td>
          <td/>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
</ul>
<h2 id="quiz">퀴즈 도메인 ("/quiz")</h2>
2. 유저는 퀴즈를 조회 할 수 있습니다. 조회 시, 단어장에서 4지선다 형식의 문제가 랜덤으로 출제됩니다. <br/>
3. 유저는 조회한 퀴즈를 풀 수 있습니다. 풀이 제출 시, 정답 결과를 바로 볼 수 있습니다.<br/>
3-1. (개인적 추가) 퀴즈를 맞출 경우 골드를 획득할 수 있습니다. 골드는 1회당 2~13 사이의 양을 무작위로 받아갈 수 있습니다.<br/>
3-2. (개인적 추가) 퀴즈를 틀릴 경우 해당 문제는 오답 처리되며, "오답 노트"에 추가됩니다.
<ul>
  <li>
    <details>
      <summary>
        <h3>GET /rand</h3>
        랜덤으로 퀴즈를 조회합니다. <br/>
        단어는 사용자의 단어장에서 출제됩니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력</li>
            <li>Bearer Token</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>조회에 성공한 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약 조건</th>
              </tr>
              <tr>
                <td>word_id</td>
                <td>
                  <li>Type: Number</li>
                  <li>Not Null</li>
                  <li>0 <= word_id인 자연수</li>
                </td>
              </tr>
              <tr>
                <td>word</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                  <li>A-Za-z의 정규식을 따르는 문자열</li>
                </td>
              </tr>
              <tr>
                <td>means</td>
                <td>
                  <li>Type: Array < Object ></li>
                  <li>Not Null</li>
                  <li>Length : 4 (고정값)</li>
                  <table>
                    <tr>
                      <th>키</th>
                      <th>제약 조건</th>
                    </tr>
                    <tr>
                      <td>word_id</td>
                      <td>
                        <li>Type: Number</li>
                        <li>Not Null</li>
                        <li>0 <= word_id인 자연수</li>
                      </td>
                    </tr>
                    <tr>
                      <td>mean_id</td>
                      <td>
                        <li>Type: Number</li>
                        <li>Not Null</li>
                        <li>0 <= mean_id인 자연수</li>
                      </td>
                    </tr>
                    <tr>
                      <td>mean</td>
                      <td>
                        <li>Type: String</li>
                        <li>Not Null</li>
                        <li>단어의 뜻</li>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>authorization의 값이 유효하지 않을 경우</td>
          <td/>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
  <li>
    <details>
      <summary>
        <h3>POST /rand</h3>
        단어 문제를 풀이합니다. <br/>
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력</li>
            <li>Bearer Token</li>
          </td>
        </tr>
        <tr>
          <td>Query</td>
          <td>word_id</td>
          <td>
            <li>Type: Number</li>
            <li>Not Null</li>
            <li>0 <= word_id인 자연수</li>
          </td>
        </tr>
        <tr>
          <td>Body</td>
          <td>mean_id</td>
          <td>
            <li>Type: Number</li>
            <li>Not Null</li>
            <li>0 <= select인 자연수</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>요청이 성공적으로 전송된 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약조건</th>
              </tr>
              <tr>
                <td>is_correct</td>
                <td>
                  <li>Type: Boolean</li>
                  <li>Not Null</li>
                </td>
              </tr>
              <tr>
                <td>word</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                </td>
              </tr>
              <tr>
                <td>mean</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                </td>
              </tr>
              <tr>  
                <td>earned_coins</td>
                <td>
                  <li>Type: Number</li>
                  <li>Not Null</li>
                  <li>Min: 7 (when wrong then 0), Max: 13</li>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>word_id 파라미터가 Numeric하지 않거나 body의 mean_id가 Number가 아닌 경우</td>
          <td/>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>authorization의 값이 유효하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>404</td>
          <td>Not Found</td>
          <td>단어 아이디가 단어장에 등록되지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
</ul>
<h2 id="wrong">(개인적 추가) 오답 노트 도메인 ("/wrong")</h2>
4. 오답 노트는 사용자가 퀴즈에서 틀린 단어들을 모아둔 도메인입니다.<br/>
해당 도메인에서 (틀린 횟수) × 2회만큼 퀴즈를 맞추면 해당 단어는 오답 노트에서 제외됩니다.<br/>
추가로, 오답 노트 도메인에서 맞춘 퀴즈의 경우 1 ~ 7코인을 무작위로 얻을 수 있습니다.
<ul>
  <li>
    <details>
      <summary>
        <h3>GET /rand</h3>
        틀린 단어 중 무작위로 퀴즈를 조회합니다. <br/>
        4개의 보기가 제공됩니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력</li>
            <li>Bearer Token</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>올바른 요청으로 조회에 성공한 경우</td>
          <td>
            <table>
              <tr>  
                <th>키</th>
                <th>제약 조건</th>
              </tr>
              <tr>
                <td>word_id</td>
                <td>
                  <li>Type: Number</li>
                  <li>Not Null</li>
                  <li>0 <= word_id인 자연수</li>
                </td>
              </tr>
              <tr>
                <td>word</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                </td>
              </tr>
              <tr>
                <td>means</td>
                <td>
                  <li>Type: Array < Object ></li>
                  <li>Not Null</li>
                  <li>Length : 4 (고정값)</li>
                  <table>
                    <tr>
                      <th>키</th>
                      <th>제약조건</th>
                    </tr>
                    <tr>
                      <td>mean_id</td>
                      <td>
                        <li>Type: Number</li>
                        <li>Not Null</li>
                        <li>0 <= mean_id인 자연수</li>
                      </td>
                    </tr>
                    <tr>
                      <td>mean</td>
                      <td>
                        <li>Type: String</li>
                        <li>Not Null</li>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>authorization의 값이 유효하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
  <li>
    <details>
      <summary>
        <h3>GET /list</h3>
        오답노트에 있는 단어들을 모아볼 수 있습니다. <br/>
        페이지 당 단어는 10개씩 제공됩니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력</li>
            <li>Bearer Token</li>
          </td>
        </tr>
        <tr>
          <td>Query</td>
          <td>page</td>
          <td>
            <li>Type: Number</li>
            <li>Nullable (Default: 0)</li>
            <li>0 <= page인 자연수</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>조회에 성공한 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약조건</th>
              </tr>
              <tr>
                <td>words</td>
                <td>
                  <li>Type: Array < Object > </li>
                  <li>Nullable</li>
                  <li>Max Length : 10</li>
                  <table>
                    <tr>
                      <th>키</th>
                      <th>제약조건</th>
                    </tr>
                    <tr>
                      <td>word_id</td>
                      <td>
                        <li>Type: Number</li>
                        <li>Not Null</li>
                        <li>0 <= word_id인 자연수</li>
                      </td>
                    </tr>
                    <tr>
                      <td>word</td>
                      <td>
                        <li>Type: String</li>
                        <li>Not Null</li>
                      </td>
                    </tr>
                    <tr>
                      <td>mean</td>
                      <td>
                        <li>Type: String</li>
                        <li>Not Null</li>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>page의 값이 Numeric하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>authorization의 값이 올바르지 않을 경우</td>
          <td/>
        </tr>
        <tr>
          <td>404<td>
          <td>Not Found</td>
          <td>(page 파라미터 + 1) × 10 − 10 + 1개만큼의 단어가 존재하지 않는 경우</td>
          <!--(page 파라미터가 0일 경우 page × 10 + 1의 결과가 음수이므로 같은 결과를 낼 수 있도록 수식 변경-->
          <td/>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
  <li>
    <details>
      <summary>
        <h3>GET /:word_id</h3>
        오답노트에 있는 단어를 조회합니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력</li>
            <li>Bearer Token</li>
          </td>
        </tr>
        <tr>
          <td>Param</td>
          <td>word_id</td>
          <td>
            <li>Type: Number</li>
            <li>Not Null</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>조회에 성공하는 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약조건</th>
              </tr>
              <tr>
                <td>word_id</td>
                <td>
                  <li>Type: Number</li>
                  <li>Not Null</li>
                  <li>0 <= word_id인 자연수</li>
                </td>
              </tr>
              <tr>
                <td>word</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                </td>
              </tr>
              <tr>
                <td>mean</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>word_id의 타입이 Number가 아닌 경우 또는 음수인 경우</td>
          <td/>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>authorization의 값이 유효하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>404</td>
          <td>Not Found</td>
          <td>오답 노트에 등록되지 않은 단어의 아이디</td>
          <td/>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
  <li>
    <details>
      <summary>
        <h3>POST /:word_id</h3>
        랜덤으로 조회한 오답노트 내의 문제를 풀이합니다. <br/>
        정답을 (해당 단어 문제를 틀린 횟수) × 2회만큼 맞출 경우 해당 단어는 오답 노트에서 제외됩니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력</li>
            <li>Bearer Token</li>
          </td>
        </tr>
        <tr>
          <td>Param</td>
          <td>word_id</td>
          <td>
            <li>Type: Number</li>
            <li>Not Null</li>
            <li>0 <= word_id인 자연수</li>
          </td>
        </tr>
        <tr>
          <td>Body</td>
          <td>mean_id</td>
          <td>
            <li>Type: Number</li>
            <li>Not Null</li>
            <li>0 <= mean_id인 자연수</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>요청에 성공한 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약조건</th>
              </tr>
              <tr>
                <td>is_correct</td>
                <td>
                  <li>Type: Boolean</li>
                  <li>Not Null</li>
                </td>
              </tr>
              <tr>
                <td>word</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                </td>
              </tr>
              <tr>
                <td>mean</td>
                <td>
                  <li>Type: String</li>
                  <li>Not Null</li>
                </td>
              </tr>
              <tr>  
                <td>earned_coins</td>
                <td>
                  <li>Type: Number</li>
                  <li>Not Null</li>
                  <li>Min: 0, Max: 7</li>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>word_id의 타입이 Number가 아닌 경우 또는 음수인 경우</td>
          <td/>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>authorization의 값이 유효하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>404</td>
          <td>Not Found</td>
          <td>오답노트에 등록되지 않은 단어의 아이디</td>
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
</ul>
<h2 id="admin">관리자 도메인 ("/admin")</h2>
관리자는 관리자 페이지에 로그인 할 수 있습니다.
관리자는 유저 리스트와, 유저의 단어장을 볼 수 있습니다.
관리자는 유저가 푼 퀴즈 리스트와, 결과를 볼 수 있습니다.
<ul>
  <li>
    <details>
      <summary>
        <h3>GET /users</h3>
        사용자 목록을 확인할 수 있습니다. <br/>
        페이지 당 최대 10명까지 조회 가능합니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력</li>
            <li>Bearer Token</li>
          </td>
        </tr>
        <tr>
          <td>Query</td>
          <td>page</td>
          <td>
            <li>Type: Number</li>
            <li>Nullable (Default : 0)</li>
            <li>0 <= page인 자연수</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>올바른 입력으로 요청에 성공하는 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약조건</th>
              </tr>
              <tr>
                <td>users</td>
                <td>
                  <li>Type: Array < Object ></li>
                  <li>Not Null</li>
                  <li>Length : 0 ~ 10</li>
                  <table>
                    <tr>
                      <th>키</th>
                      <th>제약조건</th>
                    </tr>
                    <tr>
                      <td>user_id</td>
                      <td>
                        <li>Type: Number</li>
                        <li>Not Null</li>
                        <li>0 <= user_id인 자연수</li>
                      </td>
                    </tr>
                    <tr>
                      <td>name</td>
                      <td>
                        <li>Type: String</li>
                        <li>Not Null</li>
                      </td>
                    </tr>
                    <tr>
                      <td>email</td>
                      <td>
                        <li>Type: String</li>
                        <li>Not Null</li>
                        <li>Email 형식 필요</li>
                      </td>
                    </tr>
                    <tr>
                      <td>coin</td>
                      <td>
                        <li>Type: Number</li>
                        <li>Not Null (Default 0)</li>
                        <li>0 <= coin인 자연수</li>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>page 쿼리 파라미터가 Numeric하지 않을 경우</td>
          <td/>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>authorization 값이 유효하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>403</td>
          <td>Forbidden</td>
          <td>인증 대상자의 사용자 정보에서 is_admin이 false인 경우 (관리자 권한 없는 사용자의 접근)</td>
          </td>
        </tr>
        <tr>
          <td>404</td>
          <td>Not Found</td>
          <td>(page 파라미터 + 1) × 10 − 10 + 1개만큼의 단어가 존재하지 않는 경우</td>
          <!--(page 파라미터가 0일 경우 page × 10 + 1의 결과가 음수이므로 같은 결과를 낼 수 있도록 수식 변경-->
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
  <li>
    <details>
      <summary>
        <h3>GET /words</h3>
        특정 사용자의 단어장을 조회할 수 있습니다. <br/>
        페이지 당 최대 10개의 단어를 조회할 수 있습니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력</li>
            <li>Bearer Token</li>
          </td>
        </tr>
        <tr>
          <td>Query</td>
          <td>user_id</td>
          <td>
            <li>Type: Number</li>
            <li>Not Null<li>
            <li>0 <= user_id인 자연수</li>
          </td>
        </tr>
        <tr>
          <td/>
          <td>page</td>
          <td>
            <li>Type: Number</li>
            <li>Nullable (Default : 0)</li>
            <li>0 <= page인 자연수</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>올바른 입력으로 요청에 성공하는 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약조건</th>
              </tr>
              <tr>
                <td>words</td>
                <td>
                  <li>Type: Array < Object ></li>
                  <li>Nullable</li>
                  <li>Max Length : 10</li>
                  <table>
                    <tr>
                      <th>키</th>
                      <th>제약조건</th>
                    </tr>
                    <tr>
                      <td>word_id</td>
                      <td>
                        <li>Type: Number</li>
                        <li>Not Null</li>
                        <li>0 <= word_id인 자연수</li>
                      </td>
                    </tr>
                    <tr>
                      <td>word</td>
                      <td>
                        <li>Type: String</li>
                        <li>Not Null</li>
                        <li>A-Za-z의 정규식을 따르는 문자열</li>
                      </td>
                    </tr>
                    <tr>
                      <td>mean</td>
                      <td>
                        <li>Type: String</li>
                        <li>Not Null</li>
                      </td>
                    </tr>
                  </table>
                <td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>user_id 또는 page 쿼리 파라미터가 Numeric하지 않음</td>
          <td/>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>authorization의 값이 유효하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>403</td>
          <td>Forbidden</td>
          <td>인증 대상자의 사용자 정보에서 is_admin이 false인 경우 (관리자 권한 없는 사용자의 접근)</td>
          </td>
        </tr>
        <tr>
          <td>404</td>
          <td>Not Found</td>
          <td>(page 파라미터 + 1) × 10 − 10 + 1개만큼의 단어가 존재하지 않는 경우</td>
          <!--(page 파라미터가 0일 경우 page × 10 + 1의 결과가 음수이므로 같은 결과를 낼 수 있도록 수식 변경-->
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
  <li>
    <details>
      <summary>
        <h3>GET /results</h3>
        특정 사용자가 푼 퀴즈와 결과가 포함된 리스트를 조회합니다.
      </summary>
      <h4>Request</h4>
      <table>
        <tr>
          <th>위치</th>
          <th>키</th>
          <th>제약조건</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>authorization</td>
          <td>
            <li>Type: String</li>
            <li>Not Null</li>
            <li>Access Token을 입력</li>
            <li>Bearer Token</li>
          </td>
        </tr>
        <tr>
          <td>Query</td>
          <td>user_id</td>
          <td>
            <li>Type: Number</li>
            <li>Not Null<li>
            <li>0 <= user_id인 자연수</li>
          </td>
        </tr>
        <tr>
          <td/>
          <td>page</td>
          <td>
            <li>Type: Number</li>
            <li>Nullable (Default : 0)</li>
            <li>0 <= page인 자연수</li>
          </td>
        </tr>
      </table>
      <h4>Response</h4>
      <table>
        <tr>
          <th>응답 코드</th>
          <th>코드명</th>
          <th>발생하는 경우</th>
          <th>응답값</th>
        </tr>
        <tr>
          <td>200</td>
          <td>OK</td>
          <td>올바른 입력으로 요청에 성공하는 경우</td>
          <td>
            <table>
              <tr>
                <th>키</th>
                <th>제약조건</th>
              </tr>
              <tr>  
                <td>quizzes</td>
                <td>
                  <li>Type: Array < Object ></li>
                  <li>Nullable</li>
                  <li>Max Length : 10</li>
                  <table>
                    <tr>
                      <th>키</th>
                      <th>제약조건</th>
                    </tr>
                    <tr>
                      <td>word_id</td>
                      <td>
                        <li>Type : Number</li>
                        <li>Not Null</li>
                        <li>0 <= word_id인 자연수</li>
                      </td>
                    </tr>
                    <tr>
                      <td>word</td>
                      <td>
                        <li>Type : String</li>
                        <li>Not Null</li>
                        <li>A-Za-z의 정규식을 따름</li>
                      </td>
                    </tr>
                    <tr>
                      <td>mean</td>
                      <td>
                        <li>Type : String</li>
                        <li>Not Null</li>
                      </td>
                    </tr>
                    <tr>
                      <td>has_correct</td>
                      <td>
                        <li>Type : Boolean</li>
                        <li>Not Null</li>
                      </td>
                    </tr>
                    <tr>
                      <td>earned_coin</td>
                      <td>
                        <li>Type : Number</li>
                        <li>Not Null</li>
                        <li>Min : 0, Max : 13</li>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>400</td>
          <td>Bad Request</td>
          <td>user_id 또는 page 쿼리 파라미터가 Numeric하지 않음</td>
          <td/>
        </tr>
        <tr>
          <td>401</td>
          <td>Unauthorized</td>
          <td>authorization의 값이 유효하지 않은 경우</td>
          <td/>
        </tr>
        <tr>
          <td>403</td>
          <td>Forbidden</td>
          <td>인증 대상자의 사용자 정보에서 is_admin이 false인 경우 (관리자 권한 없는 사용자의 접근)</td>
          </td>
        </tr>
        <tr>
          <td>404</td>
          <td>Not Found</td>
          <td>(page 파라미터 + 1) × 10 − 10 + 1개만큼의 단어가 존재하지 않는 경우</td>
          <!--(page 파라미터가 0일 경우 page × 10 + 1의 결과가 음수이므로 같은 결과를 낼 수 있도록 수식 변경-->
        </tr>
        <tr>
          <td>500</td>
          <td>Internal Server Error</td>
          <td>서버 처리 오류</td>
          <td/>
        </tr>
      </table>
    </details>
  </li>
  <!--쇼핑 도메인 추가 필요-->
</ul>
</p>
<p id="execute">
  <h1>실행 방법</h1>
    <h2>실행 환경</h2>
    <ul>
      <li>Node Version >= 18.19.0 </li>
      <li>npm version >= 10.2.4 </li>
      <li>pnpm version >= 8.15.1 </li>
    </ul>
    <h2>실행 명령어</h2>

```bash
npm i pnpm -g # pnpm install

pnpm i # dependency install

```

```bash
pnpm build # 빌드

pnpm start:dev # Develop mode 실행

pnpm start:prod # Production mode 실행
```

<!--
</p>
<p id="trouble">
<h1>트러블 슈팅</h1>
</p>
<p id="4">
<h1>회고</h1>
</p>
-->
