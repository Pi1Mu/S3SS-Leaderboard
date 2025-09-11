import { GuildMember, GuildMemberRoleManager } from 'discord.js'
const allowedRoleIds = [
  process.env.VERIFIER_ROLE,
  process.env.RUNNER_ROLE
].filter(Boolean)

export default defineOAuthDiscordEventHandler({
  config: {
    scope: ['identify', 'guilds', 'guilds.members.read'],
  },

  async onSuccess(event, { user }) {
    const config = useRuntimeConfig()

    try {
      // ギルドメンバーのロールを取得
      const member = await $fetch<GuildMember>(
        `https://discord.com/api/guilds/${config.targetGuildId}/members/${user.id}`,
        {
          headers: { Authorization: `Bot ${config.discordBotToken}` },
        }
      )

      const authorities = getAuthorities(member.roles)

      if (authorities.length < 1) {
        // ログイン失敗：権限不足
        return sendRedirect(event, '/?loginFailure=true&error=access_denied')
      }

      const avatarUrl = member.avatar
        ? `https://cdn.discordapp.com/guilds/${config.targetGuildId}/users/${member.user.id}/avatars/${member.avatar}.png`
        : `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`

      // セッション保存
      await setUserSession(event, {
        user: {
          id: user.id,
          name: member.user.globalName || member.user.username,
          avatar: avatarUrl,
          authorities: authorities, // 必要に応じて権限情報を設定
        },
        loggedInAt: new Date().toISOString(),
      })

      console.log('Welcome, ' + user.name + '!')

      console.log('User logged in:', await getUserSession(event))

      // ログイン成功：リダイレクト先ページに遷移
      return sendRedirect(event, '/')
    } catch (error) {
      console.error('Discord auth error:', error)
      // ログイン失敗：サーバーエラー
      return sendRedirect(event, '/')
    }
  },

  onError(event, error) {
    console.error('OAuth error:', error)
    // ログイン失敗：OAuth エラー（ユーザーキャンセル等）
    return sendRedirect(event, '/')
  },
})

/** ログイン可能チェック */
export const canLogin = (userRoles: string[]): boolean => userRoles.some(r => allowedRoleIds.includes(r))

/** 権限リスト取得 */
export const getAuthorities = (userRoles: GuildMemberRoleManager): string[] => {
  let authorities: string[] = []
  console.log(userRoles, typeof userRoles)

  userRoles.valueOf().forEach(r => {
    if (allowedRoleIds.includes(r.toString())) authorities.push(r.toString())
  })

  return authorities
}