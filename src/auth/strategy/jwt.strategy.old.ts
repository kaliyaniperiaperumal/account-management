import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import * as jwks from 'jwks-rsa';
//import { JwksService } from '../jwks.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  async validate(payload: any) {
    //throw new Error('Method not implemented.');
    console.log('Final Payload', payload);
    return payload;
  }
  // /private readonly jwksService: JwksService
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: async (request, token) => {
        console.log('Request Token', token);
        if (!token || typeof token !== 'string') {
          throw new UnauthorizedException('Token is missing or invalid');
        }
        const decoded = jwt.decode(token, { complete: true });
        // console.log('Token', decoded);
        // if (!decoded || !decoded.header.kid) {
        //   throw new Error('Invalid token');
        // }
        // return this.jwksService.getKey(decoded.header);
        // const decoded = JSON.parse(
        //   Buffer.from(token.split('.')[1], 'base64').toString(),
        // );
        console.log('Decoded', decoded);
        const { kid } = decoded.header;

        // Use your Cognito region and pool ID
        const jwksUri = `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`;
        //const jwksUri = `https://cognito-idp.${this.configService.get('COGNITO_REGION')}.amazonaws.com/${this.configService.get('COGNITO_POOL_ID')}/.well-known/jwks.json`;

        const client = jwks({ jwksUri });
        const key = await client.getSigningKey(kid);
        console.log('PublicKey', key.getPublicKey());
        // jwt.verify(
        //   token,
        //   key.getPublicKey(),
        //   { algorithms: ['RS256'] },
        //   (err, decoded) => {
        //     if (err) {
        //       console.error('Invalid Token:', err);
        //       throw new Error('Invalid JWT Token');
        //     } else {
        //       console.log('Decoded JWT:', decoded); // Decoded payload
        //     }
        //   },
        // );
        return key.getPublicKey();
      },
      algorithms: ['RS256'],
    });
  }

  // async validate(payload: any) {
  //   console.log('Final Payload', payload);
  //   return payload;
  // }
}
