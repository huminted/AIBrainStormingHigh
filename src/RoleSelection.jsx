// src/RoleSelection.jsx

import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'


export default function RoleSelection() {
    const navigate = useNavigate()
    const { state } = useLocation()
    // 如果从上一页带了 subject/description ，可以在 state.subject state.description 里读到

    // 写死演示数据
    const initialRoles = [
        {
            id: 1,
            title: 'Default',
            avatars: [
                "/assets/avatars/avatar1.png",
                "/assets/avatars/avatar2.png",
                "/assets/avatars/avatar3.png",
                "/assets/avatars/avatar4.png",
            ],
            roles: ['Product Manager', 'Operation Specialist','Software Architect', 'UI/UX Designer'],
            teamLabel: 'Development Team',
            description:['Focused on solving real user problems and shaping product strategy.',
                'Handles data and builds smart systems to power product features with machine learning',
                'Designs modular systems that scale well and remain robust under pressure.',
                'Crafts intuitive interfaces and seamless user journeys.'],
            focus:['User needs, feature prioritization, MVP validation',
                'Collect and clean data, build ML models, deploy data pipelines',
                'System architecture, scalability, stability',
                'Interface design, user experience, interaction flow'],
            name:['Peter','Lois','Stewie','Brian']
        },

    ]

    const [roles, setRoles] = useState(initialRoles)
    const [selectedIds, setSelectedIds] = useState([])

    const toggleSelect = id => {
        setSelectedIds(ids =>
            ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]
        )
    }

    const handleDelete = (e, id) => {
        e.stopPropagation()
        setRoles(rs => rs.filter(r => r.id !== id))
        // 同时取消选中
        setSelectedIds(ids => ids.filter(x => x !== id))
    }

    const handleNext = () => {
        // 过滤出用户选中的那些 role 对象
        const selectedRoles = roles.filter(r => selectedIds.includes(r.id))
        // 带到 /overview
        navigate('/overview', { state: { selectedRoles } })
    }

    const handleAdd = () => {
        navigate('/CreateRoles')
    }

    return (
        <Container>
            <Header>
                <Back onClick={() => navigate(-1)}>←</Back>
                <HeaderTitle>WELCOME TO BRAINSTORMING PANEL</HeaderTitle>
                <User>
                    <AvatarCircle>JG</AvatarCircle>
                    <UserName>Junior Garcia</UserName>
                </User>
            </Header>

            <SubTitle>Let's Select Members to Join the Brainstorming!</SubTitle>

            <Grid>
                {roles.map(role => {
                    const isSelected = selectedIds.includes(role.id)
                    return (
                        <Card
                            key={role.id}
                            selected={isSelected}
                            onClick={() => toggleSelect(role.id)}
                        >
                            <CardHeader>
                                <CardTitle>{role.title}</CardTitle>
                                <Trash onClick={e => handleDelete(e, role.id)}>🗑️</Trash>
                            </CardHeader>

                            <InnerBox>
                                <AvatarGrid>
                                    {/* 前 4 个头像格子 */}
                                    {role.avatars.slice(0, 4).map((url, i) => (
                                        <AvatarCell key={i}>
                                            <CellAvatarImg src={url} />
                                            <CellRoleName>{role.roles[i] || ''}</CellRoleName>
                                        </AvatarCell>
                                    ))}

                                    {/* 如果少于 4 个头像，最后一个格子显示 +N */}
                                    {role.avatars.length < 4 && role.extraCount > 0 && (
                                        <AvatarCell>
                                            <CellMore>+{role.extraCount}</CellMore>
                                        </AvatarCell>
                                    )}
                                </AvatarGrid>
                            </InnerBox>
                        </Card>
                    )
                })}

                <AddCard onClick={handleAdd}>＋</AddCard>
            </Grid>

            <NextStep disabled={selectedIds.length === 0} onClick={handleNext}>
                Next Step
            </NextStep>
        </Container>
    )
}


// ============ Styled Components ============

const Container = styled.div`
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at 50% 40%, #141932 0%, #0a0f1e 100%);
  display: flex;
  flex-direction: column;
  padding: 24px 48px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const Back = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #8c6ff0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #8c6ff0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: rgba(140, 111, 240, 0.1);
  }
`

const HeaderTitle = styled.h1`
  flex: 1;
  margin: 0;
  font-size: 22px;
  font-weight: bold;
  background: linear-gradient(135deg, #8c6ff0, #ff72cb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const AvatarCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #4dafff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`

const UserName = styled.div`
  color: #fff;
  font-size: 14px;
`

const SubTitle = styled.div`
  margin-top: 12px;
  font-size: 18px;
  color: #fff;
  text-align: center;
`

const Grid = styled.div`
  margin-top: 24px;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 320px);
  column-gap: 48px;
  row-gap: 48px;
  justify-content: center;
  overflow-y: auto;
`

const Card = styled.div`
  width: 320px;
  height: 360px;
  background: rgba(124, 82, 168, 0.15);
  backdrop-filter: blur(20px);
  border: ${({ selected }) =>
    selected
        ? '3px solid #8c6ff0'
        : '1px solid rgba(255, 255, 255, 0.1)'};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: border 0.2s;
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`
const CardTitle = styled.div`
  color: #fff;
  font-weight: bold;
`
const Trash = styled.div`
  cursor: pointer;
  font-size: 18px;
  color: #ccc;
  &:hover {
    color: #fff;
  }
`

const InnerBox = styled.div`
  flex: 1;
  margin: 0 16px 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`

// -------- 十字 2×2 布局部分 --------
const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
  width: 100%;
  height: 100%;
`
const AvatarCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const CellAvatarImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 8px;
`
const CellRoleName = styled.div`
  color: #fff;
  font-size: 14px;
  text-align: center;
`
const CellMore = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #f5f5f5, #c0c0c0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #333;
  box-shadow: inset 2px 2px 5px rgba(255, 255, 255, 0.6),
    inset -2px -2px 5px rgba(0, 0, 0, 0.1);
  cursor: default;
`

const AddCard = styled.div`
  width: 320px;
  height: 360px;
  background: rgba(124, 82, 168, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #fff;
  }
`

const NextStep = styled.button`
  margin: 24px auto 0;
  width: 200px;
  height: 48px;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: background 0.2s;
  &:hover {
    background: #f0f0f0;
  }
`
