import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface YelpRecentLoginEmailProps {
  userFirstName?: string;
  loginDate?: Date;
  loginDevice?: string;
  loginLocation?: string;
  otp?:number;
  loginIp?: string;
}



export const OTPEmailTemplate = ({
  userFirstName = 'Zeno',
  loginDate = new Date('September 7, 2022, 10:58 am'),
  loginDevice = 'Chrome on Mac OS X',
  otp=696969,
  loginLocation = 'Upland, California, United States',
  loginIp = '47.149.53.167',
}: YelpRecentLoginEmailProps) => {
  const formattedDate = new Intl.DateTimeFormat('en', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(loginDate);

  return (
    <Html>
      <Head />
      <Preview>Yelp recent login</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img style={{height:"115px",width:"115px",backgroundSize:"cover"}} src={`https://media.graphassets.com/v6Dy34oDSF2MFvxIhZXz`} />
          </Section>

          <Section style={content}>
            <Img width={620} src={`https://media.graphassets.com/hQY6L82cRUmeEzxImx07`} />

            <Row style={{ ...boxInfos, paddingBottom: '0' }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Hi {userFirstName},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                 Enter the following code to finish Verification.
                </Heading>
                <Section style={codeContainer}>
          <Text style={code}>{otp}</Text>
        </Section>
                <Text style={paragraph}>
                  <b>Time: </b>
                  {formattedDate}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Device: </b>
                  {loginDevice}
                </Text>
               
                <Text style={paragraph}>
                  If this was you, there's nothing else you need to do.
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  If this wasn't you ,please ignore it or Change Your Password.
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: '0' }}>
              <Column style={containerButton} colSpan={2}>
                <Button style={button}>Learn More</Button>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img width={620} src={``} />
          </Section>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'rgb(0,0,0, 0.7)',
            }}
          >
            © 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105,
            U.S.A. | www.yelp.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OTPEmailTemplate;



const code = {
  color: '#000',
  display: 'inline-block',
  fontFamily: 'HelveticaNeue-Bold',
  fontSize: '34px',
  fontWeight: 700,
  letterSpacing: '6px',
  lineHeight: '40px',
  paddingBottom: '8px',
  paddingTop: '8px',
  margin: '0 auto',
  width: '100%',
  textAlign: 'center' as const,
};

const codeContainer = {
  background: 'rgba(0,0,0,.05)',
  borderRadius: '4px',
  margin: '16px auto 14px',
  verticalAlign: 'middle',
  width: '280px',
};



const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: '30px 20px',
};

const containerButton = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
};

const button = {
  backgroundColor: '#e00707',
  padding: '12px 30px',
  borderRadius: 3,
  color: '#FFF',
  fontWeight: 'bold',
  border: '1px solid rgb(0,0,0, 0.1)',
  cursor: 'pointer',
};

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
};

const boxInfos = {
  padding: '20px 40px',
};

const containerImageFooter = {
  padding: '45px 0 0 0',
};
