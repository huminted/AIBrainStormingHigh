// src/TeamOverview.jsx

import React from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import styled from 'styled-components'

export default function TeamOverview() {
    const navigate = useNavigate()
    const location = useLocation()

    // 拿到 RoleSelection 传过来的数组，兜底空数组
    const members = location.state?.selectedRoles || []

    // 如果一个都没选，就跳回去
    if (members.length === 0) {
        return <Navigate to="/roleselect" replace />
    }

    return (
        <Page>
            <Header>
                <BackBtn onClick={() => navigate(-1)}>←</BackBtn>
                <Title>WELCOME TO BRAINSTORMING PANEL</Title>
                <Spacer />
            </Header>

            <MainTitle>Let's Check Your Team Members</MainTitle>
            <SubTitle>Default</SubTitle>

            <GridContainer>
                {members.map((member) => (
                    <Card key={member.id}>
                        <CardHeader>
                            <AvatarGroup>
                                {member.avatars.map((url, i) => (
                                    <Avatar key={i} src={url} style={{ left: i * 24 }} />
                                ))}
                                {member.extraCount > 0 && <Extra>+{member.extraCount}</Extra>}
                            </AvatarGroup>
                            <TrashIcon onClick={() => console.log('删除', member.id)}>🗑️</TrashIcon>
                        </CardHeader>

                        <RoleName>{member.title}</RoleName>

                        <DetailBox>
                            <DetailSection>
                                <DetailLabel>Focus Areas:</DetailLabel>
                                <ul>
                                    {member.roles.map((r, idx) => (
                                        <li key={idx}>{r}</li>
                                    ))}
                                </ul>
                            </DetailSection>
                            <DetailSection>
                                <DetailLabel>Description:</DetailLabel>
                                <p>{member.teamLabel}</p>
                            </DetailSection>
                        </DetailBox>
                    </Card>
                ))}
            </GridContainer>

            <NextBtn onClick={() => alert("Let's Start!")}>Let's Start</NextBtn>
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

const SubTitle = styled.div`
  margin-bottom: 16px;
  color: #fff; font-size: 18px; text-align: center;
`

const GridContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(280px, 1fr) );
  gap: 24px;
  overflow-y: auto;
  padding-bottom: 16px;
`

const Card = styled.div`
  width: 100%; max-width: 320px;
  background: rgba(124,82,168,0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 16px;
  display: flex; flex-direction: column;
`

const CardHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center;
`

const AvatarGroup = styled.div`
  position: relative; height: 40px;
`

const Avatar = styled.img`
  position: absolute; top: 0;
  width: 40px; height: 40px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.2);
  object-fit: cover;
`

const Extra = styled.div`
  position: absolute; top: 0; left: ${props => props.left || 72}px;
  width: 40px; height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: bold;
`

const TrashIcon = styled.div`
  cursor: pointer; font-size: 18px; color: #ccc;
  &:hover { color: #fff; }
`

const RoleName = styled.div`
  margin: 12px 0 8px;
  font-size: 18px; font-weight: bold; color: #fff;
`

const DetailBox = styled.div`
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(10px);
  border-radius: 8px; padding: 12px;
  color: #fff;
  flex: 1;
`

const DetailSection = styled.div`
  margin-bottom: 8px;
  & ul { margin: 4px 0 0 16px; }
`

const DetailLabel = styled.div`
  font-size: 14px; font-weight: bold;
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
