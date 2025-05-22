// src/TeamOverview.jsx
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import React, { useMemo } from 'react'


export default function TeamOverview() {
    const navigate = useNavigate()
    const location = useLocation()

    // 拿到 RoleSelection 传过来的数组
    const members = location.state?.selectedRoles || []
    console.log(members)
    const roleCards = useMemo(() => {
        return members.flatMap(member => {
            const { avatars, roles,description,focus,name } = member;

            return roles.map((role, idx) => ({
                avatar: avatars[idx],
                role,
                description: description[idx],
                focus:focus[idx],
                name:name[idx]
            }));
        });
    }, [members]);

    return (
        <Page>
            <Header>
                <BackBtn onClick={() => navigate(-1)}>←</BackBtn>
                <Title>WELCOME TO BRAINSTORMING PANEL</Title>
                <Spacer />
            </Header>

            <MainTitle>Let's Check Your Team Members</MainTitle>

            <GridContainer>
                {roleCards.map((card, i) => (
                    <Card key={i}>
                        <TopRow>
                            <Avatar src={card.avatar} />
                            <PersonName>{card.name}</PersonName>

                        </TopRow>
                        <RoleName>{card.role}</RoleName>
                        <Body>
                                <FocusArea>
                                <strong>Focus Areas:</strong>
                                <ul>
                                    <li>{card.focus}</li>
                                </ul>
                            </FocusArea>
                            <Desc>
                                <strong>Description:</strong>
                                <p>{card.description}</p>
                            </Desc>
                        </Body>
                    </Card>
                ))}
            </GridContainer>
            <NextBtn onClick={() => {window.location.href = 'http://43.157.65.157:5222/#';}}>Let's Start</NextBtn>
        </Page>
    )
}


/* =========== Styled =========== */

const Page = styled.div`
  position: fixed; inset: 0;
  background: radial-gradient(circle at 50% 40%, #141932 0%, #0a0f1e 100%);
  display: flex; flex-direction: column;
  padding: 16px 32px;
`

const Header = styled.div`
  display: flex; align-items: center; margin-bottom: 16px;
`

const BackBtn = styled.button`
  width: 40px; height: 40px;
  border: 2px solid #8c6ff0; border-radius: 50%;
  background: transparent; color: #8c6ff0;
  font-size: 20px; cursor: pointer;
  transition: background 0.2s;
  &:hover { background: rgba(140,111,240,0.1); }
`

const Title = styled.h1`
  flex: 1; margin: 0 16px;
  font-size: 22px; font-weight: bold;
  background: linear-gradient(135deg, #8c6ff0, #ff72cb);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
`

const Spacer = styled.div` width: 40px; `

const MainTitle = styled.h2`
  margin: 0 auto 4px;
  color: #fff; font-size: 24px;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;               /* 行列间距 */
  justify-items: center;   /* 单元格内元素水平居中 */
  padding: 0 220px;         /* 容器左右留白 */
`

const Card = styled.div`
  width: 100%; max-width: 320px;
  background: rgba(124,82,168,0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 16px;
  display: flex; 
  flex-direction: column;
`

const Avatar = styled.img`
  position: absolute; top: 0;
  width: 40px; height: 40px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.2);
  object-fit: cover;
`


const RoleName = styled.div`
  margin: 12px 0 8px;
  font-size: 18px; font-weight: bold; color: #fff;
`


const NextBtn = styled.button`
  margin: 16px auto 0;
  width: 180px; height: 48px;
  background: #fff; color: #000;
  border: none; border-radius: 24px;
  font-size: 16px; cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: background 0.2s;
  &:hover { background: #f0f0f0; }
`
const Desc = styled.div`
  color: #ddd;
  margin-top: 8px;
`

const FocusArea = styled.div`
  color: #ddd;
  margin-bottom: 12px;
  ul {
    margin: 4px 0 0 16px;
    padding: 0;
    list-style: disc;
  }
`

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`



const Body = styled.div`
  flex: 1;
`

const PersonName = styled.div`
  margin-left: 52px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  line-height: 15px;
`