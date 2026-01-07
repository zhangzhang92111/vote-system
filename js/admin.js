// 后台管理页面处理
document.addEventListener('DOMContentLoaded', function() {
    // 权限验证：检查用户是否已登录
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }
    
    // 退出登录功能
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    });
    
    // 获取投票数据
    let votes = JSON.parse(localStorage.getItem('votes')) || [];
    let filteredVotes = [...votes];
    
    // DOM元素
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const votesBody = document.getElementById('votesBody');
    
    // 渲染投票数据
    function renderVotes(data) {
        votesBody.innerHTML = '';
        
        if (data.length === 0) {
            votesBody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px;">暂无投票数据</td></tr>';
            return;
        }
        
        data.forEach(vote => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vote.voter}</td>
                <td>${vote.score}</td>
                <td>${vote.comment || '-'}</td>
                <td>${formatDateTime(vote.timestamp)}</td>
            `;
            votesBody.appendChild(row);
        });
    }
    
    // 格式化日期时间
    function formatDateTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    // 搜索功能
    function searchVotes() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        filteredVotes = votes.filter(vote => 
            vote.voter.toLowerCase().includes(searchTerm)
        );
        sortVotes();
    }
    
    // 排序功能
    function sortVotes() {
        const sortBy = sortSelect.value;
        
        switch(sortBy) {
            case 'date':
                filteredVotes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                break;
            case 'score-asc':
                filteredVotes.sort((a, b) => a.score - b.score);
                break;
            case 'score-desc':
                filteredVotes.sort((a, b) => b.score - a.score);
                break;
        }
        
        renderVotes(filteredVotes);
    }
    
    // 初始化事件监听
    searchInput.addEventListener('input', searchVotes);
    sortSelect.addEventListener('change', sortVotes);
    
    // 初始渲染
    renderVotes(votes);
});