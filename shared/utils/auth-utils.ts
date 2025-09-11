import { GuildMemberRoleManager } from 'discord.js'

const allowedRoleIds = [
  process.env.VERIFIER_ROLE,
  process.env.RUNNER_ROLE
].filter(Boolean)

/** ログイン可能チェック */
export const canLogin = (userRoles: string[]): boolean => userRoles.some(r => allowedRoleIds.includes(r))

/** 権限リスト取得 */
export const getAuthorities = (userRoles: GuildMemberRoleManager): string[] => {
  let authorities: string[] = []
  userRoles.valueOf().forEach(r => {
    if (allowedRoleIds.includes(r.toString())) authorities.push(r.toString())
  })

  return authorities
}

export const hasAuthority = (userAuthorities: string[], target: string): boolean => userAuthorities.includes(target)