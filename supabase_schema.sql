-- Create users table (extending auth.users)
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  role text check (role in ('farmer', 'company')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for users
alter table public.users enable row level security;
create policy "Users can view their own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update their own profile" on public.users for update using (auth.uid() = id);
create policy "Users can insert their own profile" on public.users for insert with check (auth.uid() = id);

-- Trigger to create a user automatically upon sign up
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create companies table
create table public.companies (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id),
  name text not null,
  sector text not null,
  compliance_status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for companies
alter table public.companies enable row level security;
create policy "Companies are viewable by everyone" on public.companies for select using (true);
create policy "Users can insert their own company" on public.companies for insert with check (auth.uid() = user_id);

-- Create farmlands table
create table public.farmlands (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id),
  farmer_name text not null,
  land_size numeric not null,
  crop_type text not null,
  estimated_credits numeric not null,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for farmlands
alter table public.farmlands enable row level security;
create policy "Farmlands are viewable by everyone" on public.farmlands for select using (true);
create policy "Users can insert their own farmland" on public.farmlands for insert with check (auth.uid() = user_id);

-- Insert dummy data for UI continuity (make sure to replace UUIDs if needed or let the app fetch)
-- Note: Replace 'user_id' with an actual uuid from auth.users once you create one, or remove these.
