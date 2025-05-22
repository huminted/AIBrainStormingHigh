// src/CreateRoles.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export default function CreateRoles() {
    const navigate = useNavigate()

    // 初始只写死一个角色
    const [roles, setRoles] = useState([
        {
            id: 1,
            title: 'Product Manager',
            avatars: [
                'https://i.pravatar.cc/40?img=1',
                'https://i.pravatar.cc/40?img=2',
            ],
            extraCount: 3,
            focusAreas: ['User needs', 'Feature prioritization', 'MVP validation'],
            description: 'Development Team',
        },
    ])

    // 点击“＋”模拟创建一个新角色（可改为弹窗或表单）
    const addRole = () => {
        const newId = Date.now()
        setRoles([
            ...roles,
            {
                id: newId,
                title: 'New Role',
                avatars: ['https://i.pravatar.cc/40?img=3'],
                extraCount: 0,
                focusAreas: ['Custom focus 1', 'Custom focus 2'],
                description: 'Custom Team',
            },
        ])
    }

    const goBack = () => {
        navigate(-1)
    }

    return (
        <Page>
            <Header>
                <BackBtn onClick={goBack}>←</BackBtn>
                <HeaderTitle>WELCOME TO BRAINSTORMING PANEL</HeaderTitle>
                <Spacer />
            </Header>

            <MainTitle>Let's Check Your Team Members</MainTitle>
            <SubTitle>Your Team Name ✎</SubTitle>

            <Grid>
                {/* 已有角色卡片 */}
                {roles.map(role => (
                    <Card key={role.id}>
                        <CardHeader>
                            <AvatarRow>
                                {role.avatars.map((url, i) => (
                                    <Avatar key={i} src={url} style={{ left: i * 24 }} />
                                ))}
                                {role.extraCount > 0 && <Extra>+{role.extraCount}</Extra>}
                            </AvatarRow>
                            <Trash>🗑️</Trash>
                        </CardHeader>
                        <RoleTitle>{role.title}</RoleTitle>
                        <DetailBox>
                            <DetailSection>
                                <Label>Focus Areas:</Label>
                                <ul>
                                    {role.focusAreas.map((f, i) => (
                                        <li key={i}>{f}</li>
                                    ))}
                                </ul>
                            </DetailSection>
                            <DetailSection>
                                <Label>Description:</Label>
                                <p>{role.description}</p>
                            </DetailSection>
                        </DetailBox>
                    </Card>
                ))}

                {/* 永远只渲染一个“＋”卡片 */}
                <AddCard onClick={addRole}>
                    <Plus>＋</Plus>
                </AddCard>
            </Grid>
        </Page>
    )
}

/* ===== styled-components ===== */

const Page = styled.div`
  position: fixed; inset: 0;
  background: radial-gradient(circle at 50% 40%, #141932 0%, #0a0f1e 100%);
  padding: 16px 32px;
  display: flex; flex-direction: column;
`

const Header = styled.div`
  display: flex; align-items: center; margin-bottom: 12px;
`

const BackBtn = styled.button`
  width: 40px; height: 40px;
  border: 2px solid #8c6ff0; border-radius: 50%;
  background: transparent; color: #8c6ff0;
  font-size: 20px; cursor: pointer;
  transition: background 0.2s;
  &:hover { background: rgba(140,111,240,0.1); }
`

const HeaderTitle = styled.h1`
  flex: 1; margin: 0 16px;
  font-size: 22px; font-weight: bold;
  background: linear-gradient(135deg, #8c6ff0, #ff72cb);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
`

const Spacer = styled.div`
  width: 40px;
`

const MainTitle = styled.h2`
  margin: 0 auto 4px;
  color: #fff; font-size: 24px; text-align: center;
`

const SubTitle = styled.div`
  margin-bottom: 16px;
  color: #fff; font-size: 18px; text-align: center;
`

const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 300px);
  grid-auto-rows: auto;
  grid-auto-flow: row;
  column-gap: 256px;
  row-gap:100px;
  justify-content: center;
  overflow: hidden;
`

const Card = styled.div`
  width: 300px;
  height：200px;
  background: rgba(124,82,168,0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 16px;
  display: flex; flex-direction: column;
`

const AddCard = styled(Card)`
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
`

const CardHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center;
`

const AvatarRow = styled.div`
  position: relative; width: 120px; height: 40px;
`

const Avatar = styled.img`
  position: absolute; top: 0;
  width: 40px; height: 40px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.2);
  object-fit: cover;
`

const Extra = styled.div`
  position: absolute; top: 0; left: 72px;
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: bold;
`

const Trash = styled.div`
  cursor: pointer; font-size: 18px; color: #ccc;
  &:hover { color: #fff; }
`

const RoleTitle = styled.div`
  margin: 12px 0 8px;
  font-size: 18px; font-weight: bold; color: #fff;
`

const DetailBox = styled.div`
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(10px);
  border-radius: 8px; padding: 12px;
  color: #fff; flex: 1;
`

const DetailSection = styled.div`
  margin-bottom: 8px;
  & ul { margin: 4px 0 0 16px; }
`

const Label = styled.div`
  font-size: 14px; font-weight: bold;
`

const Plus = styled.div`
  font-size: 48px;
  color: rgba(255,255,255,0.6);
`
