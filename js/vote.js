// 投票表单处理
document.addEventListener('DOMContentLoaded', function() {
    const voteForm = document.getElementById('voteForm');
    
    voteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const voter = document.getElementById('voter').value.trim();
        const score = parseInt(document.getElementById('score').value);
        const comment = document.getElementById('comment').value.trim();
        
        // 表单验证
        if (!voter || isNaN(score)) {
            alert('投票人/分数为必填项');
            return;
        }
        
        if (score < 0 || score > 100) {
            alert('分数需在0-100之间，请重新输入');
            return;
        }
        
        // 创建投票数据对象
        const voteData = {
            id: Date.now(),
            voter: voter,
            score: score,
            comment: comment,
            timestamp: new Date().toISOString()
        };
        
        // 从localStorage获取现有投票数据
        let votes = JSON.parse(localStorage.getItem('votes')) || [];
        
        // 添加新投票
        votes.push(voteData);
        
        // 保存到localStorage
        localStorage.setItem('votes', JSON.stringify(votes));
        
        // 提示投票成功并重置表单
        alert('投票成功');
        voteForm.reset();
    });
});