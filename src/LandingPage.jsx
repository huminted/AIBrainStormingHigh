// src/LandingPage.jsx

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

export default function LandingPage() {
    // 路由逻辑去掉，改为内部弹窗控制
    const [showLogin, setShowLogin]   = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    // 原有表单
    const [subject, setSubject]         = useState('');
    const [topic, setTopic]             = useState('');
    const [errors, setErrors]           = useState({ subject: '', topic: '' });
    const [showPrompts, setShowPrompts] = useState(false);
    const [visiblePrompts, setVisiblePrompts] = useState([]);

    const initialHistory = [
        { id: 1, title: 'Coffee Shop',   avatars: ['https://via.placeholder.com/32','https://via.placeholder.com/32','https://via.placeholder.com/32'] },
        { id: 2, title: 'Project Name',  avatars: ['https://via.placeholder.com/32','https://via.placeholder.com/32'] },
        { id: 3, title: 'Project Alpha', avatars: ['https://via.placeholder.com/32'] },
        { id: 4, title: 'New Idea',      avatars: ['https://via.placeholder.com/32','https://via.placeholder.com/32','https://via.placeholder.com/32','https://via.placeholder.com/32'] },
    ];
    const [history] = useState(initialHistory);

    const prompts = [
        '💡 Product Idea For An AI Writing Tool',
        '🧑‍🤝‍🧑 Define Our Product\'s User Group',
        '🧠 Teaching Prompt For Cognitive Mapping',
        '🎥 YouTube Content Plan: Tech & Ethics',
        '🚀 Marketing Strategy For New Feature',
        '📈 Growth Hacking Tactics For SaaS',
        '🛠️ Feature Roadmap Planning',
        '🎨 Brand Identity Development Ideas',
        '🤖 AI Ethics Policy Discussion',
        '🗣️ Customer Feedback Survey Questions'
    ];

    const cardStyles = [
        { bg: 'rgba(50,50,58,0.8)',   initial: 'rotate(-15deg) translate(-240px,-30px)', z: 4 },
        { bg: 'rgba(200,180,120,0.8)', initial: 'rotate(-5deg)  translate(-80px,-20px)',  z: 3 },
        { bg: 'rgba(100,130,90,0.8)',  initial: 'rotate(5deg)   translate(80px,-20px)',  z: 2 },
        { bg: 'rgba(80,100,150,0.8)',  initial: 'rotate(15deg)  translate(240px,-30px)', z: 1 },
    ];

    // refs for prompt click outside
    const promptRef   = useRef(null);
    const textAreaRef = useRef(null);

    useEffect(() => {
        function onClickOutside(e) {
            if (
                promptRef.current &&
                !promptRef.current.contains(e.target) &&
                textAreaRef.current &&
                !textAreaRef.current.contains(e.target)
            ) {
                setShowPrompts(false);
            }
        }
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    const validateField = (name, val) => {
        if (!val.trim()) {
            return name === 'subject'
                ? 'Please enter a subject.'
                : 'Please describe what you want to brainstorm.';
        }
        return '';
    };

    const handleBlur = e => {
        const { name, value } = e.target;
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleStart = () => {
        const e1 = validateField('subject', subject);
        const e2 = validateField('topic', topic);
        if (e1 || e2) {
            setErrors({ subject: e1, topic: e2 });
            return;
        }
        console.log('Start:', subject, topic);
    };

    const handlePromptClick = p => {
        setTopic(p);
        setErrors(prev => ({ ...prev, topic: '' }));
        setShowPrompts(false);
    };

    const handleTopicFocus = () => {
        const s = [...prompts].sort(() => Math.random() - 0.5).slice(0, 4);
        setVisiblePrompts(s);
        setShowPrompts(true);
    };

    // 登录/注册表单状态
    const [loginEmail, setLoginEmail]       = useState('');
    const [loginPass,  setLoginPass]        = useState('');
    const [signupEmail, setSignupEmail]     = useState('');
    const [signupPass,  setSignupPass]      = useState('');
    const [loginError, setLoginError]       = useState('');
    const [signupError,setSignupError]      = useState('');

    const handleLogin = () => {
        if (!loginEmail.trim() || !loginPass.trim()) {
            setLoginError('Email and password are required.');
            return;
        }
        console.log('登录：', loginEmail, loginPass);
        setShowLogin(false);
    };

    const handleSignup = () => {
        if (!signupEmail.trim() || !signupPass.trim()) {
            setSignupError('Email and password are required.');
            return;
        }
        console.log('注册：', signupEmail, signupPass);
        setShowSignup(false);
    };

    return (
        <Container>
            <Nav>
                <Logo>
                    <img src="/logo.png" alt="logo" /> <span>Aldealogue</span>
                </Logo>
                <NavButtons>
                    <NavButton onClick={()=>setShowLogin(true)}>Log In</NavButton>
                    <NavButton dark onClick={()=>setShowSignup(true)}>Sign Up</NavButton>
                </NavButtons>
            </Nav>

            <Main>
                <Title>Start Your <GradientText>BrainStorming</GradientText> With AI</Title>
                <Subtitle>Let <BlueText>Aldealogue</BlueText> Take Your Ideas Further</Subtitle>

                <FormWrapper>
                    <Form>
                        <Input
                            name="subject"
                            placeholder={errors.subject || 'Subject Name'}
                            value={subject}
                            hasError={!!errors.subject}
                            onChange={e=>setSubject(e.target.value)}
                            onBlur={handleBlur}
                        />
                        <TextArea
                            ref={textAreaRef}
                            name="topic"
                            placeholder={errors.topic || 'What do you want to brainstorm about?'}
                            value={topic}
                            hasError={!!errors.topic}
                            onChange={e=>setTopic(e.target.value)}
                            onFocus={handleTopicFocus}
                            onBlur={handleBlur}
                        />
                        <StartButton disabled={!subject.trim()||!topic.trim()} onClick={handleStart}>
                            💡 Start
                        </StartButton>
                    </Form>

                    <PromptBox ref={promptRef} show={showPrompts}>
                        <PromptTitle>Not Sure How To Start? Try These Brainstorming Prompts:</PromptTitle>
                        <PromptList>
                            {visiblePrompts.map((p,i)=>(
                                <PromptItem key={i} onMouseDown={()=>handlePromptClick(p)}>
                                    {p}
                                </PromptItem>
                            ))}
                        </PromptList>
                    </PromptBox>
                </FormWrapper>

                {!showPrompts && (
                    <HistoryContainer>
                        {history.map((it,idx)=>{
                            const {bg,initial,z} = cardStyles[idx];
                            return (
                                <Card key={it.id} bg={bg} initial={initial} z={z}>
                                    <CardTitle>{it.title}</CardTitle>
                                    <AvatarContainer>
                                        {it.avatars.slice(0,3).map((u,j)=>
                                            <Avatar key={j} src={u}/>
                                        )}
                                        {it.avatars.length>3 && <MoreCount>+{it.avatars.length-3}</MoreCount>}
                                    </AvatarContainer>
                                </Card>
                            );
                        })}
                    </HistoryContainer>
                )}
            </Main>

            {/* Login Modal */}
            {showLogin && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalTitle>Log In</ModalTitle>
                        <ModalInput
                            type="email"
                            placeholder="Email Address"
                            value={loginEmail}
                            onChange={e=>setLoginEmail(e.target.value)}
                        />
                        <ModalInput
                            type="password"
                            placeholder="Password"
                            value={loginPass}
                            onChange={e=>setLoginPass(e.target.value)}
                        />
                        {loginError && <ErrorText>{loginError}</ErrorText>}
                        <ButtonRow>
                            <CancelButton onClick={()=>setShowLogin(false)}>Cancel</CancelButton>
                            <ConfirmButton onClick={handleLogin}>Log In</ConfirmButton>
                        </ButtonRow>
                    </ModalContent>
                </ModalOverlay>
            )}

            {/* Signup Modal */}
            {showSignup && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalTitle>Sign Up</ModalTitle>
                        <ModalInput
                            type="email"
                            placeholder="Email Address"
                            value={signupEmail}
                            onChange={e=>setSignupEmail(e.target.value)}
                        />
                        <ModalInput
                            type="password"
                            placeholder="Password"
                            value={signupPass}
                            onChange={e=>setSignupPass(e.target.value)}
                        />
                        {signupError && <ErrorText>{signupError}</ErrorText>}
                        <ButtonRow>
                            <CancelButton onClick={()=>setShowSignup(false)}>Cancel</CancelButton>
                            <ConfirmButton onClick={handleSignup}>Create</ConfirmButton>
                        </ButtonRow>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
}

// ============ Styled Components ============

const Container = styled.div`
  position: fixed; top:0; left:0; right:0; bottom:0;
  display:flex; flex-direction:column;
  background: radial-gradient(circle at 50% 40%, rgba(20,25,50,1) 0%, rgba(10,15,30,1) 100%);
  overflow-x: visible; overflow-y: hidden;
`;

const Nav = styled.nav`
  padding: 24px 40px; display:flex; justify-content:space-between; align-items:center;
`;
const Logo = styled.div`
  display:flex; align-items:center;
  img{width:40px;margin-right:12px;}
  span{
    font-size:24px;font-weight:bold;
    background:linear-gradient(135deg,#4DAFFF,#63A8FF);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  }
`;
const NavButtons = styled.div`display:flex;gap:16px;`;
const NavButton = styled.button`
  padding:8px 16px;border-radius:16px;font-size:14px;cursor:pointer;
  background:${p=>p.dark?'#1E1E2E':'#FFF'};
  color:${p=>p.dark?'#FFF':'#000'};border:1px solid ${p=>p.dark?'transparent':'#CCC'};
`;

const Main = styled.main`
  flex:1; display:flex; flex-direction:column; align-items:center;
  padding-top:10px;
`;
const Title = styled.h1`
  position:relative; z-index:2;
  font-size:48px; font-weight:bold; color:#FFF; white-space:nowrap;
`;
const GradientText = styled.span`
  background:linear-gradient(135deg,#8C6FF0,#FF72CB);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
`;
const Subtitle = styled.h2`
  position:relative; z-index:2;
  margin:0 0 24px;
  font-size:20px; color:#CCC;
`;
const BlueText = styled.span`
  font-weight:bold;
  background:linear-gradient(135deg,#4DAFFF,#63A8FF);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
`;

const FormWrapper = styled.div`
  position:relative; margin-top:-30px; z-index:1;
`;
const Form = styled.div`
  display:flex; flex-direction:column; align-items:center; gap:16px;
`;
const Input = styled.input`
  width:500px; padding:16px 24px; border-radius:32px;
  background:rgba(255,255,255,0.05); color:#FFF; outline:none; font-size:16px;
  border:${p=>p.hasError?'1px solid #FF4D4F':'1px solid rgba(255,255,255,0.2)'};
  &::placeholder{color:${p=>p.hasError?'#FF4D4F':'rgba(255,255,255,0.6)'};}
`;
const TextArea = styled.textarea`
  width:500px; padding:16px 24px; border-radius:40px;
  background:rgba(255,255,255,0.05); color:#FFF; outline:none; font-size:16px;
  border:${p=>p.hasError?'1px solid #FF4D4F':'1px solid rgba(255,255,255,0.2)'};
  resize:none; height:80px;
  &::placeholder{color:${p=>p.hasError?'#FF4D4F':'rgba(255,255,255,0.6)'};}
`;
const StartButton = styled.button`
  padding:12px 32px;border-radius:32px;font-size:18px;cursor:pointer;
  background:linear-gradient(135deg,#8C6FF0,#FF72CB);
  color:rgba(255,255,255,0.8);border:none;
  opacity:${p=>p.disabled?0.5:1};
`;

const PromptBox = styled.div`
  position:absolute; top:100%; left:50%;
  transform:translate(-50%,16px);
  width:600px; max-width:90%; padding:24px;
  background:rgba(10,10,20,0.85); border-radius:16px;
  border:1px solid rgba(255,114,203,0.6);
  box-shadow:0 8px 24px rgba(0,0,0,0.4);
  z-index:2;
  opacity:${p=>p.show?1:0};
  pointer-events:${p=>p.show?'auto':'none'};
  transition:opacity .3s ease;
`;
const PromptTitle = styled.div`color:#FFF; font-size:16px; margin-bottom:16px;`;
const PromptList = styled.div`display:grid; grid-template-columns:1fr 1fr; gap:16px;`;
const PromptItem = styled.div`
  padding:12px 16px; border-radius:32px;
  background:linear-gradient(135deg,#8C6FF0,#FF72CB);
  color:#FFF; font-size:14px; text-align:center; cursor:pointer;
  user-select:none; transition:opacity .2s;
  &:hover{opacity:0.8;}
`;

const HistoryContainer = styled.div`
  margin-top:60px; position:relative; width:100%; height:180px;
  overflow:visible; display:flex; justify-content:center; align-items:flex-start;
`;
const AvatarContainer = styled.div`
  display:flex; align-items:center;
  opacity:0; transform:translateY(10px);
  transition:opacity .3s, transform .3s;
`;
const Avatar = styled.img`
  width:32px; height:32px; border-radius:50%;
  margin-right:-8px; border:2px solid #0f0f1f;
`;
const MoreCount = styled.div`margin-left:8px; font-size:14px; color:#FFF;`;
const Card = styled.div`
  position:absolute; width:180px; height:260px; padding:16px; border-radius:16px;
  backdrop-filter:blur(10px); box-shadow:0 8px 24px rgba(0,0,0,0.2);
  display:flex; flex-direction:column; justify-content:space-between; cursor:pointer;
  background:${p=>p.bg}; z-index:${p=>p.z}; transform:${p=>p.initial};
  transition:transform .3s, box-shadow .3s;
  &:hover{
    transform:${p=>p.initial} translateY(-20px) scale(1.05);
    box-shadow:0 12px 40px rgba(0,0,0,0.3);
    ${AvatarContainer}{opacity:1; transform:translateY(0);}
  }
`;
const CardTitle = styled.div`font-size:18px; font-weight:bold; color:#FFF;`;

// ---- Modal common ----
const ModalOverlay = styled.div`
  position:fixed; top:0; left:0; right:0; bottom:0;
  background:rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center;
  z-index:10;
`;
const ModalContent = styled.div`
  background:rgba(20,20,30,0.95); padding:24px; border-radius:16px;
  width:320px; box-shadow:0 8px 24px rgba(0,0,0,0.5);
`;
const ModalTitle = styled.h3`
  margin:0 0 16px; font-size:20px; color:#FFF; text-align:center;
`;
const ModalInput = styled.input`
  width:90%; padding:12px 16px; margin-bottom:12px;margin: 0 auto 12px; border-radius:8px;
  border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.1);
  color:#FFF; font-size:14px; outline:none;
  &::placeholder{color:rgba(255,255,255,0.6);}
`;
const ErrorText = styled.div`
  color:#FF4D4F; font-size:13px; margin-bottom:12px; text-align:center;
`;
const ButtonRow = styled.div`
  display:flex; justify-content:space-between;
`;
const CancelButton = styled.button`
  flex:1; margin-right:8px; padding:10px; border-radius:8px;
  background:#FFF; color:#000; border:none; cursor:pointer;
`;
const ConfirmButton = styled.button`
  flex:1; margin-left:8px; padding:10px; border-radius:8px;
  background:linear-gradient(135deg,#4DAFFF,#63A8FF);
  color:#FFF; border:none; cursor:pointer;
`;
