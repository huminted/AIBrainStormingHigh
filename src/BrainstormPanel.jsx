// src/BrainstormPanel.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export default function BrainstormPanel() {
    const navigate = useNavigate();
    const location = useLocation();
    // 从 LandingPage 传过来的 subject/topic 可在这里取用
    const { subject, topic } = location.state || {};

    // 写死示例数据，后续可从接口替换
    const [projects, setProjects] = useState([
        {
            id: 1,
            title: 'Project Name1',
            avatars: [
                'https://i.pravatar.cc/32?img=1',
                'https://i.pravatar.cc/32?img=2',
                'https://i.pravatar.cc/32?img=3',
            ],
            extraCount: 2,
            description: 'Here is explanation of project, which is what user input at the beginning …',
        },
        {
            id: 2,
            title: 'Project Name2',
            avatars: [
                'https://i.pravatar.cc/32?img=4',
                'https://i.pravatar.cc/32?img=5',
                'https://i.pravatar.cc/32?img=6',
            ],
            extraCount: 3,
            description: 'Here is explanation of project, which is what user input at the beginning …',
        },
        {
            id: 3,
            title: 'Project Name3',
            avatars: [
                'https://i.pravatar.cc/32?img=7',
                'https://i.pravatar.cc/32?img=8',
                'https://i.pravatar.cc/32?img=9',
            ],
            extraCount: 1,
            description: 'Here is explanation of project, which is what user input at the beginning …',
        },
        {
            id: 4,
            title: 'Project Name4',
            avatars: [
                'https://i.pravatar.cc/32?img=10',
                'https://i.pravatar.cc/32?img=11',
                'https://i.pravatar.cc/32?img=12',
            ],
            extraCount: 2,
            description: 'Here is explanation of project, which is what user input at the beginning …',
        },
        {
            id: 5,
            title: 'Project Name5',
            avatars: [
                'https://i.pravatar.cc/32?img=13',
                'https://i.pravatar.cc/32?img=14',
            ],
            extraCount: 4,
            description: 'Here is explanation of project, which is what user input at the beginning …',
        },
        {
            id: 6,
            title: 'Project Name6',
            avatars: [
                'https://i.pravatar.cc/32?img=15',
                'https://i.pravatar.cc/32?img=16',
            ],
            extraCount: 2,
            description: 'Here is explanation of project, which is what user input at the beginning …',
        },
    ]);

    const goBack = () => navigate(-1);

    // 删除卡片
    const handleDelete = id => {
        setProjects(ps => ps.filter(p => p.id !== id));
    };

    // 点击右下角 "+" 返回 LandingPage
    const handleAdd = () => {
        navigate('/');
    };

    return (
        <Page>
            <Header>
                <BackBtn onClick={goBack}>←</BackBtn>
                <HeaderTitle>WELCOME TO BRAINSTORMING PANEL</HeaderTitle>
                <Spacer />
            </Header>

            <MainTitle>Let's Check Your Team Members</MainTitle>WhatsApp Image 2025-05-21 at 10.15.58.jpeg

            <Grid>
                {projects.map(p => (
                    <Card key={p.id}>
                        <CardHeader>
                            <AvatarRow>
                                {p.avatars.map((u, i) => (
                                    <Avatar key={i} src={u} style={{ left: i * 28 }} />
                                ))}
                                {p.extraCount > 0 && <Extra>+{p.extraCount}</Extra>}
                            </AvatarRow>
                            <Trash onClick={() => handleDelete(p.id)}>🗑️</Trash>
                        </CardHeader>
                        <CardTitle>{p.title}</CardTitle>
                        <DescriptionBox>
                            {p.description}
                        </DescriptionBox>
                    </Card>
                ))}

                {/* 圆形加号卡片 */}
                <AddCard onClick={handleAdd}>
                    <Plus>＋</Plus>
                </AddCard>
            </Grid>
        </Page>
    );
}

/* ========== styled-components ========== */

const Page = styled.div`
  position: fixed; inset: 0;
  background: radial-gradient(circle at 50% 40%, #141932 0%, #0a0f1e 100%);
  padding: 16px 24px;
  display: flex; flex-direction: column;
`;

const Header = styled.div`
  display: flex; align-items: center; margin-bottom: 8px;
`;
const BackBtn = styled.button`
  width: 40px; height: 40px;
  border: 2px solid #8c6ff0; border-radius: 50%;
  background: transparent; color: #8c6ff0;
  font-size: 20px; cursor: pointer;
  transition: background 0.2s;
  &:hover { background: rgba(140,111,240,0.1); }
`;
const HeaderTitle = styled.h1`
  flex: 1; margin: 0 12px;
  font-size: 20px; font-weight: bold;
  background: linear-gradient(135deg, #8C6FF0, #FF72CB);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
`;
const Spacer = styled.div` width: 40px; `;

const MainTitle = styled.h2`
  margin: 8px 0 4px;
  color: #fff; font-size: 24px; text-align: center;
`;
const SubTitle = styled.div`
  margin-bottom: 16px;
  color: #fff; font-size: 18px; text-align: center;
`;

const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(320px, 1fr));
  gap: 24px;
  padding: 0 16px;
  overflow-y: auto;
`;

const Card = styled.div`
  background: rgba(124,82,168,0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 16px;
  display: flex; flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center;
`;

const AvatarRow = styled.div`
  position: relative; width: 120px; height: 40px;
`;
const Avatar = styled.img`
  position: absolute; top: 0;
  width: 40px; height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.2);
  object-fit: cover;
`;
const Extra = styled.div`
  position: absolute; top: 0; left: 84px;
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: bold;
`;

const Trash = styled.div`
  cursor: pointer; font-size: 18px; color: #ccc;
  &:hover { color: #fff; }
`;

const CardTitle = styled.div`
  margin: 12px 0 8px;
  font-size: 18px; font-weight: bold; color: #fff;
`;

const DescriptionBox = styled.div`
  flex: 1;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 12px;
  color: #fff;
  font-size: 14px;
  line-height: 1.5;
`;

const AddCard = styled(Card)`
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Plus = styled.div`
  font-size: 48px;
  color: rgba(255,255,255,0.6);
`;
