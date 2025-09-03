import { Injectable, UnauthorizedException, NotFoundException, forwardRef, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config'; // Import ConfigService
import { Role } from 'src/entities/role.entity';
import { CreateAdminDto } from 'src/common/dtos/create-admin.dto';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import { UpdateUserDto } from 'src/common/dtos/update-user.dto';
import { User } from 'src/entities/users.entity';
import { ERole } from 'src/common/enums/ERole.enum';
import { RoleService } from '../role/role.service';
import { JwtService } from '@nestjs/jwt';
import { UtilsService } from '../utils/utils.service';
import { EGender } from 'src/common/enums/EGender.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) public usersRepository: Repository<User>,
    // @Inject(forwardRef(() => RoleService))
    private roleService: RoleService,
    @Inject(forwardRef(() => UtilsService))
    @Inject(forwardRef(() => ConfigService))
    private configService: ConfigService,
    private jwtService: JwtService,
    private utilsService: UtilsService,
    
  ) { }



async createAdmin(body: CreateAdminDto) {
  let {
    full_name,
    email,
    gender,
    phone_number,
    registercode,
    password,
  } = body;

  if (registercode !== process.env.ADMIN_REGISTRATION_KEY) {
    throw new UnauthorizedException('Incorrect Registration Key');
  }

  const userFetched = await this.usersRepository.findOne({
    where: {
      email,
    },
  });

  if (userFetched) {
    throw new UnauthorizedException('Email already exists');
  }

  // Determine the user's gender from the input
  let userGender;
  switch (gender.toLowerCase()) {
    case 'male':
      userGender = EGender.MALE;
      break;
    case 'female':
      userGender = EGender.FEMALE;
      break;
    default:
      throw new BadRequestException(
        'The provided gender is invalid; it should be male or female',
      );
  }

  // Find the 'ADMIN' role
  const role = await this.roleService.getRoleByName(ERole[ERole.ADMIN]);
  if (!role) {
      throw new BadRequestException('Admin role not found');
  }

  // Hash the password for security
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user entity instance
const newAdmin = this.usersRepository.create({
  full_name,
  email,
  phone_number,
  gender: userGender,
  password: hashedPassword,
  roles: [role], // TypeORM expects a relationship to be an array for ManyToMany
});

  // Save the new user to the database and return it
  const savedUser = await this.usersRepository.save(newAdmin);

  // Return the saved user (or a DTO without the password)
  return savedUser;
}
  // Rest of your methods remain the same...
// In your user.service.ts or similar file

async create(createUserDto: CreateUserDto) {
  const userRole = await this.roleService.getRoleByName(ERole[ERole.USER]);

  if (!userRole) {
    throw new Error('Default USER role not found. Please create it.');
  }
  const user = this.usersRepository.create(createUserDto);
  user.password = await bcrypt.hash(user.password, 10);
  user.roles = [userRole];
  return this.usersRepository.save(user);
}

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['roles'] });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}